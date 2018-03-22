/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

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
