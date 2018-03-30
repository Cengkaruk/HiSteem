import { call, put, select } from 'redux-saga/effects'
import PostActions, { PostSelectors } from '../Redux/PostRedux'
import { AccountSelectors } from '../Redux/AccountRedux'
import { getOtherAccounts } from './AccountSagas'
import Utils from '../Transforms/Utils'
import { api } from 'steem'

api.setOptions({ url: 'https://api.steemit.com' })

export function * assignProfilesToPosts (posts, profiles) {
  let assigned = []
  let unassigned = []
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    for (var j = 0; j < profiles.length; j++) {
      var profile = profiles[j]

      if (post.author === profile.name && typeof post.profile === 'undefined') {
        post.profile = profile
        assigned.push(post)
      } else {
        unassigned.push(post)
      }
    }
  }

  return {
    assigned,
    unassigned
  }
}

export function * getOtherAuthorProfiles (posts) {
  let names = posts.map((post) => post.author)
  names = names.filter((name, index) => names.indexOf(name) === index)
  yield call(getOtherAccounts, names)
  
  let otherProfiles = yield select(AccountSelectors.getOtherProfiles)
  let { assigned: otherPosts } = yield call(assignProfilesToPosts, posts, otherProfiles)

  return otherPosts
}

export function * getPostsAuthorProfiles (posts) {
  let followerProfiles = yield select(AccountSelectors.getFollowers)
  let followingProfiles = yield select(AccountSelectors.getFollowing)
  let otherProfiles = yield select(AccountSelectors.getOtherProfiles)

  let originalPosts = posts
  let { assigned: followerPosts, unassigned: unassignedFollowerPosts } = yield call(assignProfilesToPosts, posts, followerProfiles)
  let { assigned: followingPosts, unassigned: unassignedFollowingPosts } = yield call(assignProfilesToPosts, unassignedFollowerPosts, followingProfiles)

  let names = []
  if (followerPosts.length <= 0 && followingPosts.length <= 0 || otherProfiles.length <= 0) {
    names = originalPosts.map((post) => post.author)
    names = names.filter((name, index) => names.indexOf(name) === index)

    yield call(getOtherAccounts, names)
    otherProfiles = yield select(AccountSelectors.getOtherProfiles)
  } else {
    names = unassignedFollowingPosts.map((post) => post.author)
    names = names.filter((name, index) => names.indexOf(name) === index)
  }

  let { assigned: otherPosts, unassigned: unassignedOtherPosts } = yield call(assignProfilesToPosts, unassignedFollowingPosts, otherProfiles)

  assignedPosts = [...followerPosts, ...followingPosts, ...otherPosts]

  if (unassignedOtherPosts.length > 0) {
    let additionalPosts = yield call(getOtherAuthorProfiles, unassignedOtherPosts)
    assignedPosts = [...assignedPosts, ...additionalPosts]
  }

  return assignedPosts
}

export function * getPost (by, query = {}, savedTo = null) {
  let apiMethod = `getDiscussionsBy${Utils.ucFirst(by)}Async`

  let posts = []
  try {
    query.limit = 10

    posts = yield call(api[apiMethod], query)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  // posts = yield call(getPostsAuthorProfiles, posts)

  if (savedTo) {
    yield put(PostActions.postSuccess(savedTo, posts))
  } else {
    yield put(PostActions.postSuccess(by, posts))
  }
}

export function * getReplies () {
  let profile = yield select(AccountSelectors.getProfile)
  let lastPost = yield select(PostSelectors.getBlogLastPost)

  let replies = []
  try {
    replies = yield call(api.getRepliesByLastUpdateAsync, profile.name, lastPost.permlink, 100)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  yield put(PostActions.postSuccess('replies', replies))
}

export function * getPostHome (action) {
  let profile = yield select(AccountSelectors.getProfile)

  yield call(getPost, 'trending')
  yield call(getPost, 'feed', { tag: profile.name })

  yield put(PostActions.postDone())
}

export function * getPostHighlight (action) {
  yield call(getPost, 'trending')
  yield call(getPost, 'created')
  yield call(getPost, 'hot')
  yield call(getPost, 'promoted')

  yield put(PostActions.postDone())
}

export function * getPostProfile (action) {
  let profile = yield select(AccountSelectors.getProfile)

  yield call(getPost, 'blog', { tag: profile.name })
  yield call(getPost, 'comments', { start_author: profile.name })

  yield put(PostActions.postDone())
}

export function * getPostTag (action) {
  const { tag } = action
  yield call(getPost, 'trending', { tag: tag }, 'tags')

  yield put(PostActions.postDone())
}
