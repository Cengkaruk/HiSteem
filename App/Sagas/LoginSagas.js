import { call, put, select, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'
import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import { getAccount } from './AccountSagas'
import { api, auth } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * login (action) {
  const { username, password } = action

  // NOTE: Must use password, because we need active and posting keys
  let privWif = undefined
  let postingPrivWif = undefined
  if (!auth.isWif(password)) {
    try {
      privWif = auth.toWif(username, password, 'active')
    } catch (error) {
      yield put(LoginActions.loginFailure())
    }

    try {
      postingPrivWif = auth.toWif(username, password, 'posting')
    } catch (error) {
      yield put(LoginActions.loginFailure())
    }
  } else {
    yield put(LoginActions.loginFailure())
  }

  // FIXME: This accountReset should in logout
  // Got state.account null at Sidebar when we move to there
  yield put(AccountActions.accountReset())

  yield call(getAccount, { username })
  let pubWif = yield select(AccountSelectors.getActivePublicKey)
  let postingPubWif = yield select(AccountSelectors.getPostingPublicKey)

  if (auth.wifIsValid(privWif, pubWif) && auth.wifIsValid(postingPrivWif, postingPubWif)) {
    yield put(LoginActions.loginSuccess(username, privWif, postingPrivWif))
    yield put(NavigationActions.navigate({ routeName: 'HomeScreen' }))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
}
