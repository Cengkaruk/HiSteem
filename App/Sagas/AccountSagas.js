import { call, put, select } from 'redux-saga/effects'
import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import GlobalActions, { GlobalSelectors } from '../Redux/GlobalRedux'
import { getGlobal, getCurrentMedianHistoryPrice } from './GlobalSagas'
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

  profile = yield call(Utils.parseMetadata, profile)

  yield put(AccountActions.accountSuccess(profile))
}

export function * getFollowers (username, limit) {
  let followers = []
  try {
    followers = yield call(api.getFollowersAsync, username, null, null, limit)
  } catch (error) {
    yield put(AccountActions.followListFailure())
  }

  return followers
}

export function * getFollowing (username, limit) {
  let following = []
  try {
    following = yield call(api.getFollowingAsync, username, null, null, limit)
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

  accounts = yield call(Utils.parseMetadatas, accounts)

  return accounts
}

export function * getFollowList (action) {
  const { username } = action
  let profile = yield select(AccountSelectors.getProfile)

  let theUsername = profile.name
  let others = false
  if (username && username !== profile.name) {
    theUsername = username
    others = true
  }

  let followCount = {}
  try {
    followCount = yield call(api.getFollowCountAsync, theUsername)
  } catch (error) {
    yield put(AccountActions.followListFailure())
  }

  let currentFollowers = []
  let currentFollowing = []
  if (others) {
    let currentFollowers = yield select(AccountSelectors.getOtherFollowers)
    let currentFollowing = yield select(AccountSelectors.getOtherFollowing)
  } else {
    let currentFollowers = yield select(AccountSelectors.getFollowers)
    let currentFollowing = yield select(AccountSelectors.getFollowing)
  }
  
  if (followCount.follower_count.length !== currentFollowers.length) {
    let followers = yield call(getFollowers, theUsername, followCount.follower_count)
    let followersNames = followers.map((item) => item.follower)
    currentFollowers = yield call(getAccounts, followersNames)
  }

  if (followCount.following_count.length !== currentFollowing.length) {
    let following = yield call(getFollowing, theUsername, followCount.following_count)
    let followingNames = following.map((item) => item.following)
    currentFollowing = yield call(getAccounts, followingNames)
  }

  yield put(AccountActions.followListSuccess(currentFollowers, currentFollowing, others))
}

export function * getWallet () {
  yield call(getGlobal)

  let account = yield select(AccountSelectors.getProfile)
  let globalProps = yield select(GlobalSelectors.getDynamic)

  let steemPower = yield call(Utils.vestingSteem, account, globalProps)
  let delegatedSteemPower = yield call(Utils.delegatedSteem, account, globalProps)

  let username = account.name
  yield call(getAccountHistory, { username })
  let history = yield select(AccountSelectors.getTransactionHistory)

  let pricePerSteem = 0
  let currentPrice = yield call(getCurrentMedianHistoryPrice)
  if (currentPrice) {
    const { base, quote } = currentPrice
    if (/ SBD$/.test(base) && / STEEM$/.test(quote))
      pricePerSteem = parseFloat(base.split(' ')[0])
  }
  
  let wallet = {
    steemBalance: account.balance.split(' ')[0],
    sbdBalance: account.sbd_balance.split(' ')[0],
    steemPower: steemPower,
    delegatedSteemPower: delegatedSteemPower,
    history: history
  }

  wallet.estimatedValue = ( (parseFloat(wallet.steemBalance) + parseFloat(wallet.steemPower)) * pricePerSteem ) + parseFloat(wallet.sbdBalance)
  wallet.estimatedValue = wallet.estimatedValue.toFixed(2)

  yield put(AccountActions.walletSuccess(wallet))
}

export function * getAccountHistory (action) {
  const { username } = action

  let history = []
  try {
    history = yield call(api.getAccountHistoryAsync, username, -1, 100)
  } catch (error) {
    yield put(AccountActions.accountHistoryFailure())
  }

  yield put(AccountActions.accountHistorySuccess(history))
}
