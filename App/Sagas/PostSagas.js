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

    if (!post.json_metadata.format || post.json_metadata.format === 'markdown') {
      post.body = ReformatMarkdown(post.body)
    }
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
  const { force } = action
  let profile = yield select(AccountSelectors.getProfile)

  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0 || force) {
    yield call(getPost, 'trending')
  }
  
  let feed = yield select(PostSelectors.getFeed)
  if (feed.length <= 0 || force) {
    yield call(getPost, 'feed', { tag: profile.name })
  }

  yield put(PostActions.postDone())
}

export function * getPostHighlight (action) {
  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0) {
    yield call(getPost, 'trending')
  }

  let created = yield select(PostSelectors.getCreated)
  if (created.length <= 0) {
    yield call(getPost, 'created')
  }
  
  let hot = yield select(PostSelectors.getHot)
  if (hot.length <= 0) {
    yield call(getPost, 'hot')
  }
  
  let promoted = yield select(PostSelectors.getPromoted)
  if (promoted.length <= 0) {
    yield call(getPost, 'promoted')
  }

  yield put(PostActions.postDone())
}

export function * getPostProfile (action) {
  const { force } = action
  let profile = yield select(AccountSelectors.getProfile)

  let blog = yield select(PostSelectors.getBlog)
  if (blog.length <= 0 || force) {
    yield call(getPost, 'blog', { tag: profile.name })
  }
  
  let comments = yield select(PostSelectors.getComments)
  if (comments.length <= 0 || force) {
    yield call(getPost, 'comments', { start_author: profile.name })
  }

  yield put(PostActions.postDone())
}

export function * getPostTag (action) {
  const { tag } = action
  yield call(getPost, 'trending', { tag: tag }, 'tags')

  yield put(PostActions.postDone())
}

export function * getPostTrending (action) {
  const { force } = action

  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0 || force) {
    yield call(getPost, 'trending')
  }

  yield put(PostActions.postDone())
}

export function * getPostNew (action) {
  const { force } = action

  let created = yield select(PostSelectors.getCreated)
  if (created.length <= 0 || force) {
    yield call(getPost, 'created')
  }

  yield put(PostActions.postDone())
}

export function * getPostHot (action) {
  const { force } = action

  let hot = yield select(PostSelectors.getHot)
  if (hot.length <= 0 || force) {
    yield call(getPost, 'hot')
  }

  yield put(PostActions.postDone())
}

export function * getPostPromoted (action) {
  const { force } = action

  let promoted = yield select(PostSelectors.getPromoted)
  if (promoted.length <= 0 || force) {
    yield call(getPost, 'promoted')
  }

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
  replies = yield call(reformatMarkdownBody, replies)

  yield put(PostActions.postRepliesSuccess(replies))
}
