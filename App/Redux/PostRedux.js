import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postRequest: ['by'],
  postSuccess: ['by', 'posts', 'next'],
  postFailure: null,
  postDone: null,
  postHomeRequest: ['force', 'next'],
  postHighlightRequest: ['force'],
  postProfileRequest: ['username', 'force', 'next'],
  postTagRequest: ['tag'],
  postTrendingRequest: ['force', 'next'],
  postNewRequest: ['force', 'next'],
  postHotRequest: ['force', 'next'],
  postPromotedRequest: ['force', 'next'],
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
  tags: [],
  others: {
    blog: [],
    comments: []
  }
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
  let { by, posts, next } = action
  let byObject = (by) ? by.split('.') : {}
  let others = false

  if (byObject.length > 1) {
    by = byObject[1]
    others = true
  }

  if (others) {
    if (next) {
      posts = [...state.others[by], ...posts]
    }

    return state.merge({ error: null, others: { ...state.others, [by]: posts } })
  } else {
    if (next) {
      posts = [...state[by], ...posts]
    }

    return state.merge({ error: null, [by]: posts })
  }
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
