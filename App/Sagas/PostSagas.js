import { call, put, select } from 'redux-saga/effects'
import PostActions from '../Redux/PostRedux'
import { AccountSelectors } from '../Redux/AccountRedux'
import Utils from '../Transforms/Utils'
import { api } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * getPost (by) {
  let apiMethod = `getDiscussionsBy${Utils.ucFirst(by)}Async`
  let account = yield select(AccountSelectors.getAccount)

  let posts = []
  try {
    let query = {
      limit: 10,
    }
    if (by === 'feed' || by === 'blog') {
      query.tag = account.name
    } else if (by === 'comments') {
      query.start_author = account.name
    }

    posts = yield call(api[apiMethod], query)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  yield put(PostActions.postSuccess(by, posts))
}

export function * getPostHome (action) {
  yield call(getPost, 'trending')
  yield call(getPost, 'feed')

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
  yield call(getPost, 'blog')
  yield call(getPost, 'comments')

  yield put(PostActions.postDone())
}
