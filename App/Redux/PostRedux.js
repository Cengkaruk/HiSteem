import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postRequest: ['by'],
  postSuccess: ['by', 'posts'],
  postFailure: null,
  postDone: null,
  postHomeRequest: ['force'],
  postHighlightRequest: ['force'],
  postProfileRequest: ['force'],
  postTagRequest: ['tag'],
  postTrendingRequest: ['force'],
  postNewRequest: ['force'],
  postHotRequest: ['force'],
  postPromotedRequest: ['force'],
  postRepliesRequest: ['author', 'permalink'],
  postRepliesSuccess: ['replies'],
  postRepliesFailure: null
})

export const PostTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  fetchingReplies: false,
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
  getFeed: state => state.posts.feed,
  getBlogLastPost: state => state.posts.blog,
  getTrending: state => state.posts.trending,
  getCreated: state => state.posts.created,
  getHot: state => state.posts.hot,
  getPromoted: state => state.posts.promoted,
  getBlog: state => state.posts.blog,
  getComments: state => state.posts.comments
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
  return state.merge({ fetchingReplies: false, error: null, replies })
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
  [Types.POST_REPLIES_SUCCESS]: postRepliesSuccess,
  [Types.POST_REPLIES_FAILURE]: postRepliesFailure
})
