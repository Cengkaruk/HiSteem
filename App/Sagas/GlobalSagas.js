import { call, put } from 'redux-saga/effects'
import GlobalActions from '../Redux/GlobalRedux'
// import { GlobalSelectors } from '../Redux/GlobalRedux'
import { api } from 'steem'

export function * getDynamicGlobalProperties () {
  let dynamic = {}
  try {
    dynamic = yield call(api.getDynamicGlobalPropertiesAsync)
  } catch (error) {
    yield put(GlobalActions.globalFailure())
  }

  yield put(GlobalActions.globalSuccess(dynamic))
}

export function * getGlobal () {
  yield call(getDynamicGlobalProperties)
}

export function * getRewardFund () {
  let reward = {}
  try {
    reward = yield call(api.getRewardFundAsync, 'post')
  } catch (error) {
    yield put(GlobalActions.rewardFundFailure())
  }

  yield put(GlobalActions.rewardFundSuccess(reward))
}

export function * getCurrentMedianHistoryPrice () {
  let currentPrice = {}
  try {
    currentPrice = yield call(api.getCurrentMedianHistoryPriceAsync)
  } catch (error) {
    yield put(GlobalActions.medianHistoryPriceFailure())
  }

  return currentPrice
}