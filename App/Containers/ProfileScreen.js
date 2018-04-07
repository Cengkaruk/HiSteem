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
    let profileOriginal = (this.state.profile.name) ? this.state.profile : this.props.profile
    let followersCount = (this.state.profile.name) ? this.props.others.followersCount : this.props.followersCount
    let followingCount = (this.state.profile.name) ? this.props.others.followingCount : this.props.followingCount
    let followers = (this.state.profile.name) ? this.props.others.followers : this.props.followers
    let following = (this.state.profile.name) ? this.props.others.following : this.props.following
    let blog = (this.state.profile.name) ? this.props.posts.others.blog : this.props.posts.blog
    let comments = (this.state.profile.name) ? this.props.posts.others.comments : this.props.posts.comments

    let jsonMetadata = profileOriginal.json_metadata
    let profile = {
      name: jsonMetadata.profile.name,
      about: jsonMetadata.profile.about,
      image: jsonMetadata.profile.profile_image,
      followersCount: followersCount,
      followingCount: followingCount,
      followers: followers,
      following: following,
      reputation: Utils.simplifyReputation(profileOriginal.reputation),
      blog: blog,
      comments: comments
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
            { this.state.profile.name ? (
              <Right>
                <Button medium dark bordered>
                  <Text>Follow</Text>
                </Button>
                <Button>
                  <Icon name='ios-more' />
                </Button>
              </Right>
            ) : (
              <Right />
            ) }
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
                <Text style={{ fontSize: 24 }}>{ profile.name || profileOriginal.name }</Text>
                <Text>{ profile.about }</Text>
              </Row>
              <Row style={{ padding: 20 }}>
                <Col>
                  <Text note onPress={() => navigate('FollowScreen', { title: 'Followers', items: profile.followers, username: profileOriginal.name })}>{ profile.followersCount } Followers</Text>
                </Col>
                <Col>
                  <Text note onPress={() => navigate('FollowScreen', { title: 'Following', items: profile.following, username: profileOriginal.name })}>{ profile.followingCount } Following</Text>
                </Col>
              </Row>
              <Row>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#808080' }}>
                  <Tab
                    tabStyle={{ backgroundColor: '#FFF' }}
                    activeTabStyle={{ backgroundColor: '#FFF' }}
                    activeTextStyle={{ color: '#000' }}
                    heading='Latest'>
                    <PostList title={false} navigation={this.props.navigation} posts={profile.blog} />
                  </Tab>
                  <Tab
                    tabStyle={{ backgroundColor: '#FFF' }}
                    activeTabStyle={{ backgroundColor: '#FFF' }}
                    activeTextStyle={{ color: '#000' }}
                    heading='Comments'>
                    <CommentList navigation={this.props.navigation} comments={profile.comments} />
                  </Tab>
                </Tabs>
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
    followersCount: state.account.followersCount,
    followingCount: state.account.followingCount,
    followers: state.account.followers,
    following: state.account.following,
    others: state.account.others,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFollowList: (username, next = false) => dispatch(AccountActions.followListRequest(username, next)),
    getPostProfile: (username = null, force = false) => dispatch(PostActions.postProfileRequest(username, force))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
