import React, { Component } from 'react'
import { RefreshControl } from 'react-native'
import {
  StyleProvider,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Text,
  Thumbnail,
  Tabs,
  Tab,
  Spinner,
  Badge
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import PostList from '../Components/PostList'
import CommentList from '../Components/CommentList'
import { connect } from 'react-redux'
import AccountActions from '../Redux/AccountRedux'
import PostActions from '../Redux/PostRedux'
import Utils from '../Transforms/Utils'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/ProfileScreenStyle'

import Images from '../Themes/Images'

class ProfileScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      profile: {}
    }
  }

  componentDidMount () {
    const { state: navigationState } = this.props.navigation
    
    let username = this.props.profile.name
    if (navigationState.params) {
      const { profile: profileState } = navigationState.params
      this.setState({ profile: profileState })
      username = profileState.name
    }
    this.props.getPostProfile(username, true)
    this.props.getFollowList(username)
  }

  handleRefresh = () => {
    let username = (this.state.profile.name) ? this.state.profile.name : this.props.profile.name
    this.props.getPostProfile(username, true)
    this.props.getFollowList(username)
  }

  render () {
    const { goBack, navigate } = this.props.navigation
    let profile = (this.state.profile.name) ? this.state.profile : this.props.profile
    let jsonMetadata = profile.json_metadata
    profile = {
      name: jsonMetadata.profile.name,
      about: jsonMetadata.profile.about,
      image: jsonMetadata.profile.profile_image,
      followers: this.props.followers,
      following: this.props.following,
      reputation: Utils.simplifyReputation(profile.reputation)
    }
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header noShadow light>
            <Left>
              <Button onPress={() => goBack()}>
                <Icon name='ios-arrow-back' />
              </Button>
            </Left>
            <Body />
            <Right>
              <Button medium dark bordered>
                <Text>Follow</Text>
              </Button>
              <Button>
                <Icon name='ios-more' />
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
            <Grid style={{ backgroundColor: '#FFF' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Thumbnail large source={{ uri: profile.image }} />
                <Badge info style={{ alignSelf: 'flex-end' }}>
                  <Text>{ profile.reputation }</Text>
                </Badge>
              </Row>
              <Row style={{ flexDirection: 'column', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' }}>
                <Text style={{ fontSize: 24 }}>{ profile.name }</Text>
                <Text>{ profile.about }</Text>
              </Row>
              <Row style={{ padding: 20 }}>
                <Col>
                  <Text note onPress={() => navigate('FollowScreen', { title: 'Followers', items: profile.followers })}>{ profile.followers.length } Followers</Text>
                </Col>
                <Col>
                  <Text note onPress={() => navigate('FollowScreen', { title: 'Following', items: profile.following })}>{ profile.following.length } Following</Text>
                </Col>
              </Row>
              <Row>
                { this.props.posts.fetching ? (
                  <Grid>
                    <Row style={{ justifyContent: 'center' }}>
                      <Spinner />
                    </Row>
                  </Grid>
                ) : (
                  <Tabs tabBarUnderlineStyle={{ backgroundColor: '#808080' }}>
                    <Tab
                      tabStyle={{ backgroundColor: '#FFF' }}
                      activeTabStyle={{ backgroundColor: '#FFF' }}
                      activeTextStyle={{ color: '#000' }}
                      heading='Latest'>
                      <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.blog} />
                    </Tab>
                    <Tab
                      tabStyle={{ backgroundColor: '#FFF' }}
                      activeTabStyle={{ backgroundColor: '#FFF' }}
                      activeTextStyle={{ color: '#000' }}
                      heading='Comments'>
                      <CommentList navigation={this.props.navigation} comments={this.props.posts.comments} />
                    </Tab>
                  </Tabs>
                )}
              </Row>
            </Grid>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.account.profile,
    followers: state.account.followers,
    following: state.account.following,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowList: (username) => dispatch(AccountActions.followListRequest(username)),
    getPostProfile: (username = null, force = false) => dispatch(PostActions.postProfileRequest(username, force))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
