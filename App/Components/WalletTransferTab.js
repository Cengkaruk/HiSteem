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
        <Content style={{ marginTop: 20 }}>
          <Form>
            <Item stackedLabel>
              <Label>Transfer to</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label style={{ color: 'red' }}>Currency (BUG)</Label>
              <Picker
                iosHeader='Select Asset'
                mode='dropdown'
                selectedValue={this.state.currency}
                onValueChange={this.onValueChange.bind(this)}
              >
                <PickerItem label='Steem' value='key0' />
                <PickerItem label='Steem Dollar' value='key1' />
                <PickerItem label='Steem Power' value='key2' />
              </Picker>
            </Item>
            <Item stackedLabel>
              <Label>Amount</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Optional Memo</Label>
              <Input />
            </Item>
          </Form>
          <Button light block style={{ margin: 20 }}>
            <Text>Send</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
