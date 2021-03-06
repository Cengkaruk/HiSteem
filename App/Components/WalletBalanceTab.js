import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right,
  Text
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import Utils from '../Transforms/Utils'
// import styles from './Styles/WalletBalanceTabStyle'

class WalletBalanceTab extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <Container>
        <Content style={{ padding: 20 }}>
          <Grid>
            <Row style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 120 }}>
              <Text style={{ fontSize: 40 }}>${ this.props.wallet.estimatedValue }</Text>
              <Text style={{ marginTop: 10 }}>Estimated Account Value</Text>
            </Row>
            <Row style={{ height: 100 }}>
              <Grid>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <Text>STEEM</Text>
                  <Text note>Tradeable tokens that may be transferred anywhere at anytime. Steem can be converted to STEEM POWER in a process called powering up.</Text>
                </Col>
                <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text bold>{ this.props.wallet.steemBalance } STEEM</Text>
                </Col>
              </Grid>
            </Row>
            <Row style={{ height: 90 }}>
              <Grid>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <Text>STEEM POWER</Text>
                  <Text note>Influence tokens which give you more control over post payouts and allow you to earn on curation rewards.</Text>
                </Col>
                <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text bold>{ this.props.wallet.steemPower } STEEM</Text>
                  <Text note>+{ this.props.wallet.delegatedSteemPower }</Text>
                </Col>
              </Grid>
            </Row>
            <Row style={{ height: 80 }}>
              <Grid>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <Text>STEEM DOLLARS</Text>
                  <Text note>Tokens worth about $1.00 of STEEM, currently collecting 0% APR.</Text>
                </Col>
                <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text bold>${ this.props.wallet.sbdBalance }</Text>
                </Col>
              </Grid>
            </Row>
            <Row style={{ marginVertical: 30 }}>
              <List style={{ flex: 1 }}>
                <ListItem itemHeader first style={{ paddingLeft: 0, paddingBottom: 15 }}>
                  <Text>TRANSACTION HISTORY</Text>
                </ListItem>
                { this.props.wallet.history && this.props.wallet.history.map((item, index) =>
                  <ListItem style={{ marginLeft: 0 }} key={index}>
                    <Body>
                      <Text style={{ marginLeft: 0 }}>Transfer { item[1].op[1].amount } from { item[1].op[1].from }</Text>
                      <Text note style={{ marginLeft: 0 }}>{ item[1].op[1].memo }</Text>
                    </Body>
                    <Right>
                      <Text note>{ Utils.dateToHuman(item[1].timestamp) }</Text>
                    </Right>
                  </ListItem>
                ) }
              </List>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.account.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceTab)