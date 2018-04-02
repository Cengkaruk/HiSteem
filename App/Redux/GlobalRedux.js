import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  globalRequest: null,
  globalSuccess: ['dynamic'],
  globalFailure: null
})

export const GlobalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  dynamic: {}
})

/* ------------- Selectors ------------- */

export const GlobalSelectors = {
  getDynamic: state => state.global.dynamic
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GLOBAL_REQUEST]: request,
  [Types.GLOBAL_SUCCESS]: success,
  [Types.GLOBAL_FAILURE]: failure
})
