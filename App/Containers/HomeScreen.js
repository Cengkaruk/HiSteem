import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
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
  Icon,
  Text
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
    this.props.getPostHome()
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  handleRefresh = () => {
    this.props.getPostHome(true)
  }

  handleLoadMore = () => {
    this.props.getPostHome(true, true)
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
              <Right>
                <Button transparent onPress={() => this.props.navigation.navigate('NotificationScreen')}>
                  <Icon name='notifications' />
                </Button>
              </Right>
            </Header>
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.props.posts.fetching}
                  onRefresh={this.handleRefresh}
                />
              }
            >
              <Grid>
                <Row>
                  <PostCarousel navigation={this.props.navigation} posts={this.props.posts} />
                </Row>
                <Row>
                  <PostList navigation={this.props.navigation} posts={this.props.posts.feed} />
                </Row>
                <Row style={{ padding: 20, justifyContent: 'center' }}>
                  <Button transparent dark onPress={this.handleLoadMore}>
                    <Text>Load More</Text>
                  </Button>
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
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostHome: (force = false, next = false) => dispatch(PostActions.postHomeRequest(force, next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
