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
  otherAccountRequest: ['names'],
  otherAccountSuccess: ['profiles'],
  otherAccountFailure: null
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
  others: []
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getProfile: state => state.account.profile,
  getActivePublicKey: state => state.account.profile.active.key_auths[0][0],
  getFollowers: state => state.account.followers,
  getFollowing: state => state.account.following,
  getOtherProfiles: state => state.account.others
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
  state.merge({ fetching: false, profile: null, followers: [], following: [] })

export const followListRequest = state =>
  state.merge({ fetching: true })

export const followListSuccess = (state, { followers, following }) =>
  state.merge({ fetching: false, followers, following })

export const followListFailure = state =>
  state.merge({ fetching: false, error: true })

export const otherAccountSuccess = (state, { profiles }) =>
  state.merge({ fetching: false, error: null, others: profiles })

export const otherAccountFailure = state =>
  state.merge({ fetching: true, error: true, others: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACCOUNT_REQUEST]: request,
  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_RESET]: reset,
  [Types.FOLLOW_LIST_REQUEST]: followListRequest,
  [Types.FOLLOW_LIST_SUCCESS]: followListSuccess,
  [Types.FOLLOW_LIST_FAILURE]: followListFailure,
  [Types.OTHER_ACCOUNT_REQUEST]: request,
  [Types.OTHER_ACCOUNT_SUCCESS]: otherAccountSuccess,
  [Types.OTHER_ACCOUNT_FAILURE]: otherAccountFailure
})
