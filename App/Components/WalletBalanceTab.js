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
// import styles from './Styles/WalletBalanceTabStyle'

export default class WalletBalanceTab extends Component {
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
              <Text style={{ fontSize: 40 }}>$54,533</Text>
              <Text style={{ marginTop: 10 }}>Estimated Account Value</Text>
            </Row>
            <Row style={{ height: 100 }}>
              <Grid>
                <Col size={2} style={{ justifyContent: 'center' }}>
                  <Text>STEEM</Text>
                  <Text note>Tradeable tokens that may be transferred anywhere at anytime. Steem can be converted to STEEM POWER in a process called powering up.</Text>
                </Col>
                <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text bold>322.000 STEEM</Text>
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
                  <Text bold>432.000 STEEM</Text>
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
                  <Text bold>$54,433</Text>
                </Col>
              </Grid>
            </Row>
            <Row style={{ marginVertical: 30 }}>
              <List style={{ flex: 1 }}>
                <ListItem itemHeader first style={{ paddingLeft: 0, paddingBottom: 15 }}>
                  <Text>TRANSACTION HISTORY</Text>
                </ListItem>
                <ListItem style={{ marginLeft: 0 }}>
                  <Body>
                    <Text style={{ marginLeft: 0 }}>Transfer 0.001 SBD from big-whale</Text>
                    <Text note style={{ marginLeft: 0 }}>Hai @cengkaruk.. Selamat datang di Steemit! Sedikit kado kecil dari kami.. :-]</Text>
                  </Body>
                  <Right>
                    <Text note>7 hours ago</Text>
                  </Right>
                </ListItem>
                <ListItem style={{ marginLeft: 0 }}>
                  <Body>
                    <Text style={{ marginLeft: 0 }}>Claim rewards: 0.022 STEEM POWER</Text>
                    <Text note style={{ marginLeft: 0 }} />
                  </Body>
                  <Right>
                    <Text note>7 hours ago</Text>
                  </Right>
                </ListItem>
                <ListItem style={{ marginLeft: 0 }}>
                  <Body>
                    <Text style={{ marginLeft: 0 }}>Transfer 0.001 SBD from big-whale</Text>
                    <Text note style={{ marginLeft: 0 }}>Hai @cengkaruk.. Selamat datang di Steemit! Sedikit kado kecil dari kami.. :-]</Text>
                  </Body>
                  <Right>
                    <Text note>7 hours ago</Text>
                  </Right>
                </ListItem>
              </List>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}
