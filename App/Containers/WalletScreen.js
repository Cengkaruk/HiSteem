import React, { Component } from 'react'
import {
  StyleProvider,
  Drawer,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Tabs,
  Tab,
  Button,
  Icon
} from 'native-base'
import Sidebar from '../Components/Sidebar'
import WalletBalanceTab from '../Components/WalletBalanceTab'
import WalletTransferTab from '../Components/WalletTransferTab'
import WalletExchangeTab from '../Components/WalletExchangeTab'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/WalletScreenStyle'

class WalletScreen extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  render () {
    return (
      <StyleProvider style={getTheme()}>
        <Drawer
          ref={(ref) => { this.drawer = ref }}
          content={<Sidebar navigation={this.props.navigation} />}
          onClose={() => this.closeDrawer()} >
          <Container style={{ backgroundColor: '#EEEEEE' }}>
            <Header hasTabs>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Wallet</Title>
              </Body>
              <Right />
            </Header>
            <Tabs>
              <Tab heading='Balance'>
                <WalletBalanceTab />
              </Tab>
              <Tab heading='Transfer'>
                <WalletTransferTab />
              </Tab>
              <Tab heading='Exchange'>
                <WalletExchangeTab />
              </Tab>
            </Tabs>
          </Container>
        </Drawer>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen)