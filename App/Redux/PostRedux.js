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
  postRepliesFailure: null,
  postVoteRequest: ['author', 'permalink'],
  postVoteSuccess: null,
  postVoteFailure: null,
  uploadImageRequest: ['image'],
  uploadImageSuccess: ['url'],
  uploadImageFailure: null
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
  },
  vote: {
    fetching: false,
    error: false
  },
  image: {
    uploading: false,
    url: null
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

export const postVoteRequest = state =>
  state.merge({ vote: { fetching: true } })

export const postVoteSuccess = state =>
  state.merge({ vote: { fetching: false, error: false } })

export const postVoteFailure = state =>
  state.merge({ vote: { fetching: false, error: true } })

export const uploadImageRequest = (state, action) => {
  const { image } = action
  return state.merge({ image: { uploading: true } })
}

export const uploadImageSuccess = (state, action) => {
  const { url } = action
  return state.merge({ image: { uploading: false, url: url } })
}

export const uploadImageFailure = state =>
  state.merge({ image: { uploading: false, url: null } })

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
  [Types.POST_REPLIES_FAILURE]: postRepliesFailure,
  [Types.POST_VOTE_REQUEST]: postVoteRequest,
  [Types.POST_VOTE_SUCCESS]: postVoteSuccess,
  [Types.POST_VOTE_FAILURE]: postVoteFailure,
  [Types.UPLOAD_IMAGE_REQUEST]: uploadImageRequest,
  [Types.UPLOAD_IMAGE_SUCCESS]: uploadImageSuccess,
  [Types.UPLOAD_IMAGE_FAILURE]: uploadImageFailure
})
