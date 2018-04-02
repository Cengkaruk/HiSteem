import { call, put, select } from 'redux-saga/effects'
import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import GlobalActions, { GlobalSelectors } from '../Redux/GlobalRedux'
import { getGlobal } from './GlobalSagas'
import { api } from 'steem'
import Utils from '../Transforms/Utils'

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

export function * getAccounts (usernames) {
  let accounts = []
  try {
    accounts = yield call([api, api.getAccountsAsync], usernames)
  } catch (error) {
    yield put(AccountActions.followListFailure())
  }

  return accounts
}

export function * getFollowList (action) {
  const { username } = action
  let followers = yield call(getFollowers, username)
  let following = yield call(getFollowing, username)

  let currentFollowers = yield select(AccountSelectors.getFollowers)
  let currentFollowing = yield select(AccountSelectors.getFollowing)

  if (followers.length !== currentFollowers.length) {
    let followersNames = followers.map((item) => item.follower)
    currentFollowers = yield call(getAccounts, followersNames)
  }

  if (following.length !== currentFollowing.length) {
    let followingNames = following.map((item) => item.following)
    currentFollowing = yield call(getAccounts, followingNames)
  }

  yield put(AccountActions.followListSuccess(currentFollowers, currentFollowing))
}

export function * getWallet () {
  yield call(getGlobal)

  let account = yield select(AccountSelectors.getProfile)
  let globalProps = yield select(GlobalSelectors.getDynamic)

  let steemPower = yield call(Utils.vestingSteem, account, globalProps)
  let delegatedSteemPower = yield call(Utils.delegatedSteem, account, globalProps)

  let wallet = {
    steemBalance: account.balance.split(' ')[0],
    sbdBalance: account.sbd_balance.split(' ')[0],
    steemPower: steemPower,
    delegatedSteemPower: delegatedSteemPower
  }

  yield put(AccountActions.walletSuccess(wallet))
}
