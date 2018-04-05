import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  globalRequest: null,
  globalSuccess: ['dynamic'],
  globalFailure: null,
  rewardFundRequest: null,
  rewardFundSuccess: ['reward'],
  rewardFundFailure: null,
  medianHistoryPriceFailure: null
})

export const GlobalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  dynamic: {},
  rewardFund: {}
})

/* ------------- Selectors ------------- */

export const GlobalSelectors = {
  getDynamic: state => state.global.dynamic,
  getRewardFund: state => state.global.rewardFund
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { dynamic } = action
  return state.merge({ fetching: false, error: null, dynamic })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, dynamic: null })

export const rewardFundSuccess = (state, action) => {
  const { reward } = action
  return state.merge({ fetching: false, error: null, rewardFund: reward })
}

export const rewardFundFailure = state =>
  state.merge({ fetching: false, error: true, rewardFund: null })

export const medianHistoryPriceFailure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GLOBAL_REQUEST]: request,
  [Types.GLOBAL_SUCCESS]: success,
  [Types.GLOBAL_FAILURE]: failure,
  [Types.REWARD_FUND_REQUEST]: request,
  [Types.REWARD_FUND_SUCCESS]: rewardFundSuccess,
  [Types.REWARD_FUND_FAILURE]: rewardFundFailure,
  [Types.MEDIAN_HISTORY_PRICE_FAILURE]: medianHistoryPriceFailure
})
