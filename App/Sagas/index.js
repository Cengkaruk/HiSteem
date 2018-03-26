import { takeLatest, all } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { PostTypes } from '../Redux/PostRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getAccount, getFollowList } from './AccountSagas'
import { login, logout } from './LoginSagas'
import { getPost } from './PostSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount),
    takeLatest(AccountTypes.FOLLOW_LIST_REQUEST, getFollowList),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout),
    takeLatest(PostTypes.POST_REQUEST, getPost)
  ])
}
