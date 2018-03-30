import { call, put, select } from 'redux-saga/effects'
import PostActions, { PostSelectors } from '../Redux/PostRedux'
import { AccountSelectors } from '../Redux/AccountRedux'
import { getAccounts } from './AccountSagas'
import Utils from '../Transforms/Utils'
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

export function * getPost (by, query = {}, savedTo = null) {
  let apiMethod = `getDiscussionsBy${Utils.ucFirst(by)}Async`

  let posts = []
  try {
    query.limit = 10

    posts = yield call(api[apiMethod], query)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  posts = yield call(getPostsAuthorProfiles, posts)

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
