import { call, put, select } from 'redux-saga/effects'
import TagActions, { TagSelectors } from '../Redux/TagRedux'
import { api } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * getTag () {
  let { tags: currentTags } = yield select(TagSelectors.getTags)

  if (currentTags.length <= 0) {
    try {
      currentTags = yield call(api.getTrendingTagsAsync, 'steem', 150)
    } catch (error) {
      yield put(TagActions.tagFailure())
    }
  }

  yield put(TagActions.tagSuccess(currentTags))
}
