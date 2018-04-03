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
  postProfileRequest: null,
  postTagRequest: ['tag'],
  postTrendingRequest: null,
  postNewRequest: null,
  postHotRequest: null,
  postPromotedRequest: null,
  postRepliesRequest: ['author', 'permalink'],
  postRepliesFailure: null
})

export const PostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  fetchingReplies: null,
  error: null,
  feed: [],
  trending: [],
  created: [],
  hot: [],
  promoted: [],
  blog: [],
  comments: [],
  replies: [],
  tags: []
})

/* ------------- Selectors ------------- */

export const PostSelectors = {
  getFeed: state => state.feed,
  getBlogLastPost: state => state.blog
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

export const postRepliesRequest = state =>
  state.merge({ fetchingReplies: true, replies: [] })

export const postRepliesSuccess = (state, action) => {
  const { replies } = action
  return state.merge({ fetchingReplies: false, replies })
}

export const postRepliesFailure = state =>
  state.merge({ fetchingReplies: false, error: true, replies: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_REQUEST]: request,
  [Types.POST_SUCCESS]: success,
  [Types.POST_FAILURE]: failure,
  [Types.POST_DONE]: done,
  [Types.POST_HOME_REQUEST]: request,
  [Types.POST_HIGHLIGHT_REQUEST]: request,
  [Types.POST_PROFILE_REQUEST]: request,
  [Types.POST_TAG_REQUEST]: request,
  [Types.POST_TRENDING_REQUEST]: request,
  [Types.POST_NEW_REQUEST]: request,
  [Types.POST_HOT_REQUEST]: request,
  [Types.POST_PROMOTED_REQUEST]: request,
  [Types.POST_REPLIES_REQUEST]: postRepliesRequest,
  [Types.POST_REPLIES_FAILURE]: postRepliesFailure
})
