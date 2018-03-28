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
  Text,
  Spinner
} from 'native-base'
import Sidebar from '../Components/Sidebar'
import PostList from '../Components/PostList'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/HighlightScreenStyle'

class HighlightScreen extends Component {
  componentDidMount () {
    this.props.getPostHighlight()
  }

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
            { this.props.posts.fetching ? (
              <Spinner />
            ) : (
              <Tabs>
                <Tab heading='Trending'>
                  <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.trending} />
                </Tab>
                <Tab heading='New'>
                  <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.created} />
                </Tab>
                <Tab heading='Hot'>
                  <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.hot} />
                </Tab>
                <Tab heading='Promoted'>
                  <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.promoted} />
                </Tab>
              </Tabs>
            )}
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
    getPostHighlight: () => dispatch(PostActions.postHighlightRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighlightScreen)
