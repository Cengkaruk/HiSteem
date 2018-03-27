import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postRequest: ['by'],
  postSuccess: ['by', 'posts'],
  postFailure: null,
  postDone: null,
  postHomeRequest: null,
  postHighlightRequest: null,
  postProfileRequest: null
})

export const PostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  feed: [],
  trending: [],
  created: [],
  hot: [],
  promoted: [],
  blog: [],
  comments: []
})

/* ------------- Selectors ------------- */

export const PostSelectors = {
  getFeed: state => state.feed
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { by, posts } = action
  return state.merge({ error: null, [by]: posts })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true })

export const done = state =>
  state.merge({ fetching: false })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_SUCCESS]: success,
  [Types.POST_FAILURE]: failure,
  [Types.POST_DONE]: done,
  [Types.POST_HOME_REQUEST]: request,
  [Types.POST_HIGHLIGHT_REQUEST]: request,
  [Types.POST_PROFILE_REQUEST]: request
})
