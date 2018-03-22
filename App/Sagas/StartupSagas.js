import { put } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, logging enabled in Dev')
  }

  yield put(AccountActions.accountRequest('cengkaruk'))
}
