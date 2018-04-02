import { formatter } from 'steem'

const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.substr(1)
}

const vestingSteem = (account, globalProps) => {
  const vestingShares = account.vesting_shares
  const totalVest = globalProps.total_vesting_shares
  const totalVestFundSteem = globalProps.total_vesting_fund_steem

  let steemPower = formatter.vestToSteem(vestingShares, totalVest, totalVestFundSteem)

  return steemPower.toFixed(3)
}

const delegatedSteem = (account, globalProps) => {
  const delegatedVest = account.delegated_vesting_shares
  const receivedVest = account.received_vesting_shares
  const vestingShares = `${receivedVest.split(' ')[0] - delegatedVest.split(' ')[0]} VESTS`
  const totalVest = globalProps.total_vesting_shares
  const totalVestFundSteem = globalProps.total_vesting_fund_steem

  let delegatedSteemPower = formatter.vestToSteem(vestingShares, totalVest, totalVestFundSteem)

  return delegatedSteemPower.toFixed(3)
}

export default {
  ucFirst,
  vestingSteem,
  delegatedSteem
}
