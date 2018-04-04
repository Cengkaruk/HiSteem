import { call, put, select } from 'redux-saga/effects'
import PostActions, { PostSelectors } from '../Redux/PostRedux'
import { AccountSelectors } from '../Redux/AccountRedux'
import { getAccounts } from './AccountSagas'
import Utils from '../Transforms/Utils'
import ReformatMarkdown from '../Transforms/ReformatMarkdown'
import { api } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * getPostsAuthorProfiles (posts) {
  let names = posts.map((post) => post.author)
  names = names.filter((name, index) => names.indexOf(name) === index)

  let accounts = []
  try {
    accounts = yield call(getAccounts, names)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    for (var j = 0; j < accounts.length; j++) {
      var profile = accounts[j]

      if (post.author === profile.name && typeof post.profile === 'undefined') {
        post.profile = profile
      }
    }
  }

  return posts
}

export function * reformatMarkdownBody (posts) {
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]
    post.body = ReformatMarkdown(post.body)
  }

  return posts
}

// FIXME: We currently remove linked image markdown
// https://github.com/mientjan/react-native-markdown-renderer/issues/34
export function * takeOutLinkedImage (posts) {
  const regexLinkedImage = /\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  const regexImage = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    if (post.json_metadata) {
      let jsonMetadata = post.json_metadata
      if (jsonMetadata.tags) {
        // FIXME: Sorry Steepshot, your footer image are not in best resolution
        if (jsonMetadata.tags[jsonMetadata.tags.length - 1] === 'steepshot') {
          let images = post.body.match(regexImage)[0]
          post.body = images
        }
      }
    }

    let images = post.body.match(regexImage)
    let linkedImages = post.body.match(regexLinkedImage)
    if (linkedImages) {
      for (var j = 0; j < linkedImages.length; j++) {
        post.body = post.body.replace(linkedImages[j], images[j])
      }
    }
  }

  return posts
}

export function * getPost (by, query = {}, savedTo = null) {
  let apiMethod = `getDiscussionsBy${Utils.ucFirst(by)}Async`

  let posts = []
  try {
    query.limit = 10

    posts = yield call(api[apiMethod], query)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  posts = yield call(Utils.parseMetadatas, posts)
  posts = yield call(takeOutLinkedImage, posts)
  posts = yield call(getPostsAuthorProfiles, posts)
  posts = yield call(reformatMarkdownBody, posts)

  if (savedTo) {
    yield put(PostActions.postSuccess(savedTo, posts))
  } else {
    yield put(PostActions.postSuccess(by, posts))
  }
}

export function * getReplies () {
  let profile = yield select(AccountSelectors.getProfile)
  let lastPost = yield select(PostSelectors.getBlogLastPost)

  let replies = []
  try {
    replies = yield call(api.getRepliesByLastUpdateAsync, profile.name, lastPost.permlink, 100)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  yield put(PostActions.postSuccess('replies', replies))
}

export function * getPostHome (action) {
  let profile = yield select(AccountSelectors.getProfile)

  yield call(getPost, 'trending')
  yield call(getPost, 'feed', { tag: profile.name })

  yield put(PostActions.postDone())
}

export function * getPostHighlight (action) {
  yield call(getPost, 'trending')
  yield call(getPost, 'created')
  yield call(getPost, 'hot')
  yield call(getPost, 'promoted')

  yield put(PostActions.postDone())
}

export function * getPostProfile (action) {
  let profile = yield select(AccountSelectors.getProfile)

  yield call(getPost, 'blog', { tag: profile.name })
  yield call(getPost, 'comments', { start_author: profile.name })

  yield put(PostActions.postDone())
}

export function * getPostTag (action) {
  const { tag } = action
  yield call(getPost, 'trending', { tag: tag }, 'tags')

  yield put(PostActions.postDone())
}

export function * getPostTrending (action) {
  yield call(getPost, 'trending')

  yield put(PostActions.postDone())
}

export function * getPostNew (action) {
  yield call(getPost, 'created')

  yield put(PostActions.postDone())
}

export function * getPostHot (action) {
  yield call(getPost, 'hot')

  yield put(PostActions.postDone())
}

export function * getPostPromoted (action) {
  yield call(getPost, 'promoted')

  yield put(PostActions.postDone())
}

// FIXME: Pagination needed, there is no limit option in api
// https://github.com/steemit/steem-js/issues/366
export function * getPostReplies (action) {
  const { author, permalink } = action

  let replies = []
  try {
    replies = yield call(api.getContentRepliesAsync, author, permalink)
  } catch (error) {
    yield put(PostActions.postRepliesFailure())
  }

  replies = yield call(Utils.parseMetadatas, replies)
  replies = yield call(takeOutLinkedImage, replies)
  replies = yield call(getPostsAuthorProfiles, replies)

  yield put(PostActions.postSuccess('replies', replies))
}
