import { put, select, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation'
import AccountActions from '../Redux/AccountRedux'
import { LoginSelectors } from '../Redux/LoginRedux'

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, logging enabled in Dev')
  }
  
  const isLoggedIn = yield select(LoginSelectors.isLoggedIn)
  if (isLoggedIn) {
    yield put(NavigationActions.navigate({ routeName: 'ProfileScreen' }))
  } else {
    yield put(NavigationActions.navigate({ routeName: 'LoginScreen' }))
  }
}
