import { call, put, select } from 'redux-saga/effects'
import PostActions, { PostSelectors } from '../Redux/PostRedux'
import { LoginSelectors } from '../Redux/LoginRedux'
import { AccountSelectors } from '../Redux/AccountRedux'
import { getAccounts } from './AccountSagas'
import { getRewardFund, getCurrentMedianHistoryPrice } from './GlobalSagas'
import { GlobalSelectors } from '../Redux/GlobalRedux'
import Utils from '../Transforms/Utils'
import ReformatMarkdown from '../Transforms/ReformatMarkdown'
import { api, broadcast } from 'steem'
import { hash, PrivateKey, Signature } from 'steem/lib/auth/ecc'
import axios from 'axios'
import { version } from '../../package.json'

api.setOptions({ url: 'https://api.steemit.com' })

export function * getPostsAuthorProfiles (posts) {
  let names = posts.map((post) => post.author)
  names = names.filter((name, index) => names.indexOf(name) === index)

  let accounts = []
  try {
    accounts = yield call(getAccounts, names)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    for (var j = 0; j < accounts.length; j++) {
      var profile = accounts[j]

      if (post.author === profile.name && typeof post.profile === 'undefined') {
        post.profile = profile
      }
    }
  }

  return posts
}

export function * reformatMarkdownBody (posts) {
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    if (!post.json_metadata.format || post.json_metadata.format === 'markdown') {
      post.body = ReformatMarkdown(post.body)
    }
  }

  return posts
}

// FIXME: We currently remove linked image markdown
// https://github.com/mientjan/react-native-markdown-renderer/issues/34
export function * takeOutLinkedImage (posts) {
  const regexLinkedImage = /\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  const regexImage = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  for (var i = 0; i < posts.length; i++) {
    var post = posts[i]

    if (post.json_metadata) {
      let jsonMetadata = post.json_metadata
      if (jsonMetadata.tags) {
        // FIXME: Sorry Steepshot, your footer image are not in best resolution
        if (jsonMetadata.tags[jsonMetadata.tags.length - 1] === 'steepshot') {
          if (post.body) {
            let images = post.body.match(regexImage)[0]
            post.body = images
          }
        }
      }
    }

    if (post.body) {
      let images = post.body.match(regexImage)
      let linkedImages = post.body.match(regexLinkedImage)
      if (linkedImages) {
        for (var j = 0; j < linkedImages.length; j++) {
          post.body = post.body.replace(linkedImages[j], images[j])
        }
      }
    }
  }

  return posts
}

export function * getPayoutFromRewardShares (rewardFund, currentPrice) {
  let rewardBalance = parseFloat(rewardFund.reward_balance.split(' ')[0])
  let recentClaims = parseFloat(rewardFund.recent_claims)
  let fundPerShare = rewardBalance / recentClaims

  let basePrice = parseFloat(currentPrice.base.split(' ')[0])
  let payout = fundPerShare * basePrice
  
  return payout
}

export function * calculateEstimatedPayout (posts, rewardFund, currentPrice) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i]

    let estimatedPayout = 0
    let payoutFromRewardShares = yield call(getPayoutFromRewardShares, rewardFund, currentPrice)
    for (let j = 0; j < post.active_votes.length; j++) {
      let vote = post.active_votes[j]
      let rshares = parseFloat(vote.rshares)
      estimatedPayout += rshares * payoutFromRewardShares
    }
    post.estimated_payout = estimatedPayout.toFixed(2)
  }

  return posts
}

export function * getPost (by, query = {}, savedTo = null, next = null) {
  let apiMethod = `getDiscussionsBy${Utils.ucFirst(by)}Async`

  let posts = []
  try {
    if (!query.limit) {
      query.limit = 10
    }

    if (next) {
      query.start_author = next.author
      query.permlink = next.permlink
    }

    posts = yield call(api[apiMethod], query)
  } catch (error) {
    yield put(PostActions.postFailure())
  }

  posts = yield call(Utils.parseMetadatas, posts)
  posts = yield call(takeOutLinkedImage, posts)
  posts = yield call(getPostsAuthorProfiles, posts)
  posts = yield call(reformatMarkdownBody, posts)

  yield call(getRewardFund)
  let rewardFund = yield select(GlobalSelectors.getRewardFund)
  let currentPrice = yield call(getCurrentMedianHistoryPrice)

  posts = yield call(calculateEstimatedPayout, posts, rewardFund, currentPrice)

  let isNext = (next) ? true : false
  if (savedTo) {
    yield put(PostActions.postSuccess(savedTo, posts, isNext))
  } else {
    yield put(PostActions.postSuccess(by, posts, isNext))
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
  const { force, next } = action
  let profile = yield select(AccountSelectors.getProfile)

  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0 || force) {
    yield call(getPost, 'trending')
  }
  
  let feed = yield select(PostSelectors.getFeed)
  if (feed.length <= 0 || force) {
    // FIXME: start_author and permlink query are not available at Feed
    let limit = 10
    if (next) {
      limit = feed.length + limit
    }
    yield call(getPost, 'feed', { tag: profile.name, limit: limit })
  }

  yield put(PostActions.postDone())
}

export function * getPostHighlight (action) {
  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0) {
    yield call(getPost, 'trending')
  }

  let created = yield select(PostSelectors.getCreated)
  if (created.length <= 0) {
    yield call(getPost, 'created')
  }
  
  let hot = yield select(PostSelectors.getHot)
  if (hot.length <= 0) {
    yield call(getPost, 'hot')
  }
  
  let promoted = yield select(PostSelectors.getPromoted)
  if (promoted.length <= 0) {
    yield call(getPost, 'promoted')
  }

  yield put(PostActions.postDone())
}

export function * getPostProfile (action) {
  const { username, force, next } = action
  let profile = yield select(AccountSelectors.getProfile)

  let theUsername = profile.name
  let others = false
  if (username && username !== profile.name) {
    theUsername = username
    others = true
  }

  let blog = yield select(PostSelectors.getBlog)
  if (blog.length <= 0 || force) {
    let savedTo = (others) ? 'others.blog' : null
    // FIXME: start_author and permlink query are not available at Feed
    let limit = 10
    if (next) {
      limit = blog.length + limit
    }
    yield call(getPost, 'blog', { tag: theUsername, limit: limit }, savedTo)
  }
  
  let comments = yield select(PostSelectors.getComments)
  if (comments.length <= 0 || force) {
    let savedTo = (others) ? 'others.comments' : null
    let nextComment = null
    if (next) {
      nextComment = comments[comments.length - 1]
    }
    yield call(getPost, 'comments', { start_author: theUsername }, savedTo, nextComment)
  }

  yield put(PostActions.postDone())
}

export function * getPostTag (action) {
  const { tag } = action
  yield call(getPost, 'trending', { tag: tag }, 'tags')

  yield put(PostActions.postDone())
}

export function * getPostTrending (action) {
  const { force, next } = action

  let trending = yield select(PostSelectors.getTrending)
  if (trending.length <= 0 || force) {
    let nextTrending = null
    if (next) {
      nextTrending = trending[trending.length - 1]
    }
    yield call(getPost, 'trending', {}, null, nextTrending)
  }

  yield put(PostActions.postDone())
}

export function * getPostNew (action) {
  const { force, next } = action

  let created = yield select(PostSelectors.getCreated)
  if (created.length <= 0 || force) {
    let nextCreated = null
    if (next) {
      nextCreated = created[created.length - 1]
    }
    yield call(getPost, 'created', {}, null, nextCreated)
  }

  yield put(PostActions.postDone())
}

export function * getPostHot (action) {
  const { force, next } = action

  let hot = yield select(PostSelectors.getHot)
  if (hot.length <= 0 || force) {
    let nextHot = null
    if (next) {
      nextHot = hot[hot.length - 1]
    }
    yield call(getPost, 'hot', {}, null, nextHot)
  }

  yield put(PostActions.postDone())
}

export function * getPostPromoted (action) {
  const { force, next } = action

  let promoted = yield select(PostSelectors.getPromoted)
  if (promoted.length <= 0 || force) {
    let nextPromoted = null
    if (next) {
      nextPromoted = promoted[promoted.length - 1]
    }
    yield call(getPost, 'promoted', {}, null, nextPromoted)
  }

  yield put(PostActions.postDone())
}

// FIXME: Pagination needed, there is no limit option in api
// https://github.com/steemit/steem-js/issues/366
export function * getPostReplies (action) {
  const { author, permalink } = action

  let replies = []
  try {
    replies = yield call(api.getContentRepliesAsync, author, permalink)
  } catch (error) {
    yield put(PostActions.postRepliesFailure())
  }

  replies = yield call(Utils.parseMetadatas, replies)
  replies = yield call(takeOutLinkedImage, replies)
  replies = yield call(getPostsAuthorProfiles, replies)
  replies = yield call(reformatMarkdownBody, replies)

  yield call(getRewardFund)
  let rewardFund = yield select(GlobalSelectors.getRewardFund)
  let currentPrice = yield call(getCurrentMedianHistoryPrice)

  replies = yield call(calculateEstimatedPayout, replies, rewardFund, currentPrice)

  yield put(PostActions.postRepliesSuccess(replies))
}

export function * voteRequest (action) {
  const { author, permalink } = action
  const weight = 10000

  let login = yield select(LoginSelectors.getLogin)
  try {
    // FIXME: Still not doing the vote work
    yield call(broadcast.voteAsync, login.privateKey, login.username, author, permalink, weight)
  } catch (error) {
    yield put(PostActions.postVoteFailure())
  }

  yield put(PostActions.postVoteSuccess())
}

export function * uploadImageRequest (action) {
  const { image } = action
  const data = Buffer.from(image.data, 'base64')

  let login = yield select(LoginSelectors.getLogin)

  // The challenge needs to be prefixed with a constant (both on the server and checked on the client) to make sure the server can't easily make the client sign a transaction doing something else.
  // https://github.com/steemit/imagehoster/blob/master/imagehoster/app/server/upload-data.js#L147
  const prefix = new Buffer('ImageSigningChallenge')
  const bufferData = hash.sha256(Buffer.concat([prefix, data]))
  const signature = Signature.signBufferSha256(bufferData, login.postingPrivateKey)
  
  const profile = yield select(AccountSelectors.getProfile)

  let url = `https://steemitimages.com/${profile.name}/${signature.toHex()}`
  let formData = new FormData()
  formData.append('data', {
    uri: image.uri,
    type: image.type,
    name: image.fileName
  })

  try {
    let { data: response } = yield call(axios.post, url, formData)
    yield put(PostActions.uploadImageSuccess(response.url))
  } catch (error) {
    yield put(PostActions.uploadImageFailure())
  }
}

export function * postComment (action) {
  let { parentAuthor, parentPermalink, title, body, tags } = action
  parentAuthor = (parentAuthor) ? parentAuthor : ''

  parentPermalink = (parentPermalink) ? parentPermalink : 'histeem'

  let login = yield select(LoginSelectors.getLogin)
  let wif = login.postingPrivateKey
  
  let content = body.replace(title, '')
  content = content.replace(/^(\#{1,6})+/gm, '')
  content = content.trim()

  let profile = yield select(AccountSelectors.getProfile)
  let author = profile.name

  let permalink = Utils.postPermalink(title)
  
  // FIXME: Still detect image as link
  // const regexLink = /\[[^\]]*\]\((.*?)("(?:.*[^"])")?\s*\)/g
  let regexImage = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  // let links = content.match(regexLink)
  let images = content.match(regexImage)

  let jsonMetadata = {
    app: `histeem/lemah/${version}`,
    format: 'markdown',
    community: 'histeem',
    tags: tags,
    // links: links,
    image: images
  }

  const operations = [ 
    ['comment', 
      { 
        parent_author: parentAuthor, 
        parent_permlink: parentPermalink, 
        author: author, 
        permlink: permalink, 
        title: title, 
        body: content, 
        json_metadata : JSON.stringify(jsonMetadata) 
      } 
    ], 
    ['comment_options', { 
      author: author, 
      permlink: permalink, 
      max_accepted_payout: '1000000.000 SBD', 
      percent_steem_dollars: 10000, 
      allow_votes: true, 
      allow_curation_rewards: true, 
      extensions: [ 
        [0, { 
          beneficiaries: [
            { account: 'histeem.app', weight: 1500 },
            { account: 'cengkaruk', weight: 1000 }
          ] 
        }] 
      ] 
    }] 
  ]

  try {
    let tx = yield call(broadcast.sendAsync, { operations, extensions: [] }, { posting: wif })
    yield put(PostActions.postCommentSuccess())
  } catch (error) {
    yield put(PostActions.postCommentFailure())
  }
}
