import { takeLatest, all } from 'redux-saga/effects'
// import API from '../Services/Api'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AccountTypes } from '../Redux/AccountRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { PostTypes } from '../Redux/PostRedux'
import { TagTypes } from '../Redux/TagRedux'
import { GlobalTypes } from '../Redux/GlobalRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getAccount, getFollowList, getWallet } from './AccountSagas'
import { login, logout } from './LoginSagas'
import {
  getPost,
  getPostHome,
  getPostHighlight,
  getPostProfile,
  getPostTag,
  getPostTrending,
  getPostNew,
  getPostHot,
  getPostPromoted,
  getPostReplies
} from './PostSagas'
import { getTag } from './TagSagas'
import { getGlobal } from './GlobalSagas'

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
    takeLatest(AccountTypes.WALLET_REQUEST, getWallet),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout),
    takeLatest(PostTypes.POST_REQUEST, getPost),
    takeLatest(PostTypes.POST_HOME_REQUEST, getPostHome),
    takeLatest(PostTypes.POST_HIGHLIGHT_REQUEST, getPostHighlight),
    takeLatest(PostTypes.POST_PROFILE_REQUEST, getPostProfile),
    takeLatest(PostTypes.POST_TAG_REQUEST, getPostTag),
    takeLatest(PostTypes.POST_TRENDING_REQUEST, getPostTrending),
    takeLatest(PostTypes.POST_NEW_REQUEST, getPostNew),
    takeLatest(PostTypes.POST_HOT_REQUEST, getPostHot),
    takeLatest(PostTypes.POST_PROMOTED_REQUEST, getPostPromoted),
    takeLatest(PostTypes.POST_REPLIES_REQUEST, getPostReplies),
    takeLatest(TagTypes.TAG_REQUEST, getTag),
    takeLatest(GlobalTypes.GLOBAL_REQUEST, getGlobal)
  ])
}
