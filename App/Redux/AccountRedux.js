import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  accountRequest: ['username'],
  accountSuccess: ['profile'],
  accountFailure: null,
  accountReset: null,
  followListRequest: ['username', 'next'],
  followListSuccess: ['count', 'followers', 'following', 'others', 'append'],
  followListFailure: null,
  walletRequest: null,
  walletSuccess: ['wallet'],
  walletFailure: null,
  accountHistoryRequest: ['username'],
  accountHistorySuccess: ['history'],
  accountHistoryFailure: null
})

export const AccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  profile: null,
  followersCount: 0,
  followingCount: 0,
  followers: [],
  following: [],
  wallet: {},
  history: [],
  others: {
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: []
  }
})

/* ------------- Selectors ------------- */

export const AccountSelectors = {
  getProfile: state => state.account.profile,
  getActivePublicKey: state => state.account.profile.active.key_auths[0][0],
  getPostingPublicKey: state => state.account.profile.posting.key_auths[0][0],
  getFollowers: state => state.account.followers,
  getFollowing: state => state.account.following,
  getOtherFollowers: state => state.account.others.followers,
  getOtherFollowing: state => state.account.others.following,
  getTransactionHistory: state => state.account.history.filter(tx => tx[1].op[0] === 'transfer')
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

export const followListSuccess = (state, { count, followers, following, others, append }) => {
  if (append) {
    followers = followers.slice()
    following = following.slice()
  }

  if (others) {
    if (append) {
      followers = [...state.others.followers, ...followers]
      following = [...state.others.following, ...following]
    }

    return state.merge({ fetching: false, others: { followers, following, followersCount: count.followers, followingCount: count.following } })
  } else {
    if (append) {
      followers = [...state.followers, ...followers]
      following = [...state.following, ...following]
    }

    return state.merge({ fetching: false, followers, following, followersCount: count.followers, followingCount: count.following })
  }
}

export const followListFailure = state =>
  state.merge({ fetching: false, error: true })

export const walletSuccess = (state, { wallet }) =>
  state.merge({ fetching: false, wallet })

export const walletFailure = state =>
  state.merge({ fetching: false, error: true })

export const accountHistorySuccess = (state, { history }) =>
  state.merge({ fetching: false, history })

export const accountHistoryFailure = state =>
  state.merge({ fetching: false, error: true, history: [] })

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
  [Types.WALLET_FAILURE]: walletFailure,
  [Types.ACCOUNT_HISTORY_REQUEST]: request,
  [Types.ACCOUNT_HISTORY_SUCCESS]: accountHistorySuccess,
  [Types.ACCOUNT_HISTORY_FAILURE]: accountHistoryFailure
})
