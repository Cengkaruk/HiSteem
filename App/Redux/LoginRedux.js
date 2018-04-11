import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username', 'privateKey', 'postingPrivateKey'],
  loginFailure: null,
  logoutRequest: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  error: null,
  loggedIn: false,
  username: null,
  privateKey: null,
  postingPrivateKey: null
})

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getLogin: state => state.login,
  isLoggedIn: state => state.login.loggedIn
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state => 
  state.merge({ fetching: true })

// successful api lookup
export const success = (state, action) => {
  const { username, privateKey, postingPrivateKey } = action
  return state.merge({ fetching: false, error: null, loggedIn: true, username, privateKey: privateKey, postingPrivateKey: postingPrivateKey })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, loggedIn: false, username: null, privateKey: null, postingPrivateKey: null })

export const logoutRequest = state =>
  state.merge({ fetching: false, error: true, loggedIn: false, username: null, privateKey: null, postingPrivateKey: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT_REQUEST]: logoutRequest
})
