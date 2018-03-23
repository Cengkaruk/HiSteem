import { call, put, select, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux'
import AccountActions, { AccountSelectors } from '../Redux/AccountRedux'
import { getAccount } from './AccountSagas'
import { api, auth } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * login (action) {
  const { username, password } = action

  let privWif = password
  if (!auth.isWif(privWif)) {
    try {
      privWif = auth.toWif(username, privWif, 'active')
    } catch (error) {
      yield put(LoginActions.loginFailure())
    }
  }

  yield call(getAccount, { username })
  let pubWif = yield select(AccountSelectors.getActivePublicKey)

  if (auth.wifIsValid(privWif, pubWif)) {
    yield put(LoginActions.loginSuccess(username, privWif, 'active'))
    yield put(NavigationActions.navigate({ routeName: 'HomeScreen' }))
  } else {
    yield put(LoginActions.loginFailure())
  }
}

export function * logout () {
  yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
}
