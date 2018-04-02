import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: ['username'],
  accountSuccess: ['profile'],
  accountFailure: null,
  accountReset: null,
  followListRequest: ['username'],
  followListSuccess: ['followers', 'following'],
  followListFailure: null,
  walletRequest: null,
  walletSuccess: ['wallet'],
  walletFailure: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  profile: null,
  followers: [],
  following: [],
  // others: []
  wallet: {}
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getProfile: state => state.account.profile,
  getActivePublicKey: state => state.account.profile.active.key_auths[0][0],
  getFollowers: state => state.account.followers,
  getFollowing: state => state.account.following
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, { profile }) =>
  state.merge({ fetching: false, error: null, profile })

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, profile: null })

export const reset = state =>
  state.merge({ fetching: false, profile: null, followers: [], following: [], wallet: {} })

export const followListRequest = state =>
  state.merge({ fetching: true })

export const followListSuccess = (state, { followers, following }) =>
  state.merge({ fetching: false, followers, following })

export const followListFailure = state =>
  state.merge({ fetching: false, error: true })

export const walletSuccess = (state, { wallet }) =>
  state.merge({ fetching: false, wallet })

export const walletFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_RESET]: reset,
  [Types.FOLLOW_LIST_REQUEST]: followListRequest,
  [Types.FOLLOW_LIST_SUCCESS]: followListSuccess,
  [Types.FOLLOW_LIST_FAILURE]: followListFailure,
  [Types.WALLET_REQUEST]: request,
  [Types.WALLET_SUCCESS]: walletSuccess,
  [Types.WALLET_FAILURE]: walletFailure
})
