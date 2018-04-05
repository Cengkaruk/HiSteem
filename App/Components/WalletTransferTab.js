import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Button,
  Text
} from 'native-base'
// import styles from './Styles/WalletTransferTabStyle'

const PickerItem = Picker.Item

export default class WalletTransferTab extends Component {
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

  constructor (props) {
    super(props)
    this.state = {
      currency: 'key0'
    }
  }

  onValueChange (value) {
    this.setState({
      currency: value
    })
  }

  render () {
    return (
      <Container>
        <Content style={{ padding: 20 }}>
          <Text>Transfer Coming Soon</Text>
        </Content>
      </Container>
    )
  }
}
