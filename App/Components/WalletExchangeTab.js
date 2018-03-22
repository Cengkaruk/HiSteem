import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Text
} from 'native-base'
// import styles from './Styles/WalletExchangeTabStyle'

export default class WalletExchangeTab extends Component {
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
          <Text>Exchange Coming Soon</Text>
        </Content>
      </Container>
    )
  }
}
