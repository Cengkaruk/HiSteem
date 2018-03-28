import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tagRequest: [],
  tagSuccess: ['tags'],
  tagFailure: null
})

export const TagTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  tags: []
})

/* ------------- Selectors ------------- */

export const TagSelectors = {
  getTags: state => state.tags
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { tags } = action
  return state.merge({ fetching: false, error: null, tags })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAG_REQUEST]: request,
  [Types.TAG_SUCCESS]: success,
  [Types.TAG_FAILURE]: failure
})
