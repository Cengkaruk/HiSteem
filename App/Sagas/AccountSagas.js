import { call, put, select } from 'redux-saga/effects'
import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import { api } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * getAccount (action) {
  const { username } = action
  let profile = yield select(AccountSelectors.getProfile)

  if (!profile) {
    try {
      [profile] = yield call([api, api.getAccountsAsync], [username])
    } catch (error) {
      yield put(AccountActions.accountFailure())
    }
  }
  yield put(AccountActions.accountSuccess(profile))
}

export function * getFollowers (username) {
  let followers = []
  try {
    followers = yield call(api.getFollowersAsync, username, null, null, 100)
  } catch (error) {
    yield put(AccountActions.followListFailure())
  }

  return followers
}

export function * getFollowing (username) {
  let following = []
  try {
    following = yield call(api.getFollowingAsync, username, null, null, 100)
  } catch (error) {
    yield put(AccountActions.followListFailure())
  }

  return following
}

export function * getFollowList (action) {
  const { username } = action
  let followers = yield call(getFollowers, username)
  let following = yield call(getFollowing, username)

  yield put(AccountActions.followListSuccess(followers, following))
}
