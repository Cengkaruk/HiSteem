import React, { Component } from 'react'
import {
  StyleProvider,
  Drawer,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import Sidebar from '../Components/Sidebar'
import PostCarousel from '../Components/PostCarousel'
import PostList from '../Components/PostList'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  componentDidMount () {
    this.props.getPostTrending()
    this.props.getPostFeed()
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
            <Header>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Home</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Grid>
                <Row>
                  <PostCarousel navigation={this.props.navigation} posts={this.props.posts} />
                </Row>
                <Row>
                  <PostList navigation={this.props.navigation} posts={this.props.posts.feed} />
                </Row>
              </Grid>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostTrending: () => dispatch(PostActions.postRequest('trending')),
    getPostFeed: () => dispatch(PostActions.postRequest('feed'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
