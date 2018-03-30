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
  Icon,
  Text
} from 'native-base'
import Sidebar from '../Components/Sidebar'
import TrendingTab from '../Components/TrendingTab'
import HotTab from '../Components/HotTab'
import NewTab from '../Components/NewTab'
import PromotedTab from '../Components/PromotedTab'
import { connect } from 'react-redux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/HighlightScreenStyle'

class HighlightScreen extends Component {
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
                <Title>Highlights</Title>
              </Body>
              <Right />
            </Header>
            <Tabs>
              <Tab heading='Trending'>
                <TrendingTab />
              </Tab>
              <Tab heading='New'>
                <NewTab />
              </Tab>
              <Tab heading='Hot'>
                <HotTab />
              </Tab>
              <Tab heading='Promoted'>
                <PromotedTab />
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
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightScreen)
