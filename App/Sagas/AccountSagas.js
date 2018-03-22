import { fromJS } from 'immutable'
import { call, put, select } from 'redux-saga/effects'
import AccountActions from '../Redux/AccountRedux'
import { api } from 'steem'
import { AccountSelectors } from '../Redux/AccountRedux'

api.setOptions({ url: 'https://api.steemit.com'})

export function * getAccount (action) {
  const { username } = action
  let account = yield select(AccountSelectors.getAccount)
  
  if (!account) {
    try {
      [account] = yield call([api, api.getAccountsAsync], [username])
    } catch (error) {
      console.log(error)
      yield put(AccountActions.accountFailure())
    }
  }
  yield put(AccountActions.accountSuccess(account))
}
