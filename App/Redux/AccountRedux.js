import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: ['username'],
  accountSuccess: ['account'],
  accountFailure: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  account: null
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getAccount: state => state.account.account,
  getActivePublicKey: state => state.account.account.active.key_auths[0][0]
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { account }) =>
  state.merge({ fetching: false, error: null, account })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, account: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure
})
