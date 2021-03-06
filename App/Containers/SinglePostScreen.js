import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import {
  StyleProvider,
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Subtitle,
  Right,
  Button,
  Icon,
  Text,
  Thumbnail,
  Spinner
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import ActionButton from 'react-native-action-button'
import { connect } from 'react-redux'
import Markdown from 'react-native-markdown-renderer'
import WebView from 'react-native-webview-autoheight'
import PostActions from '../Redux/PostRedux'
import Utils from '../Transforms/Utils'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/SinglePostScreenStyle'
import Images from '../Themes/Images'

const minMaxWidth = Dimensions.get('window').width - 30
const stylesMarkdown = StyleSheet.create({
  image: {
    minWidth: minMaxWidth,
    maxWidth: minMaxWidth
  }
})

class SinglePostScreen extends Component {
  componentDidMount () {
    const { state: navigationState } = this.props.navigation
    const { post } = navigationState.params
    this.props.getPostReplies(post.author, post.permlink)
  }

  handleVote = (author, permalink) => {
    if (!author && !permalink) {
      const { state: navigationState } = this.props.navigation
      const { post } = navigationState.params
      author = post.author
      permalink = post.permlink
    }

    this.props.doVote(author, permalink)
  }

  render () {
    const { goBack, navigate, state: navigationState } = this.props.navigation
    const { post } = navigationState.params
    let profile = {}
    if (post.profile.json_metadata) {
      let jsonMetadata = post.profile.json_metadata
      if (jsonMetadata.profile) {
        profile = {
          name: jsonMetadata.profile.name,
          image: jsonMetadata.profile.profile_image
        }
      }
    }
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header light>
            <Left>
              <Button onPress={() => goBack()}>
                <Icon name='ios-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{ profile.name || post.author }</Title>
              <Subtitle>{ Utils.dateToHuman(post.created) }</Subtitle>
            </Body>
            <Right>
              <Button>
                <Icon name='share' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Grid>
              <Row style={{ padding: 15, backgroundColor: '#FFF' }}>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 32 }}>{ post.title }</Text>
              </Row>
              <Row style={{ backgroundColor: '#FFF', padding: 15 }}>
                <Markdown style={stylesMarkdown}>{ post.body }</Markdown>
              </Row>
              <Row style={{ marginVertical: 20 }}>
                <Grid>
                  <Row style={{ padding: 7.5, backgroundColor: '#FFF', alignItems: 'center' }} onPress={() => navigate('NewPostScreen')}>
                    <Thumbnail small source={{ uri: this.props.profile.json_metadata.profile.profile_image }} style={{ marginRight: 10 }} />
                    <Text note>Write a response...</Text>
                  </Row>
                  { this.props.isRepliesFetching ? (
                    <Spinner />
                  ) : (
                    <Row style={{ flexDirection: 'column', marginTop: 5 }}>
                      { this.props.replies.map((reply, index) =>
                        <Grid style={{ marginTop: 10, padding: 15, backgroundColor: '#FFF' }} key={index}>
                          <Row onPress={() => navigate('ProfileScreen', { profile: reply.profile })}>
                            { reply.profile.json_metadata.profile && 
                              <Thumbnail small source={{ uri: reply.profile.json_metadata.profile.profile_image }} style={{ marginRight: 10 }} />
                            }
                            <Col style={{ alignItems: 'flex-start' }}>
                              { reply.profile.json_metadata.profile ? (
                                <Text>{ reply.profile.json_metadata.profile.name }</Text>
                              ) : (
                                <Text>{ reply.author }</Text>
                              ) }
                              <Text note>{ Utils.dateToHuman(reply.created) }</Text>
                            </Col>
                          </Row>
                          <Row style={{ paddingVertical: 10, borderBottomColor: '#F8F8F8', borderBottomWidth: 1 }}>
                            { !reply.json_metadata.format || reply.json_metadata.format === 'markdown' ? (
                              <Markdown style={stylesMarkdown}>{ reply.body }</Markdown>
                            ) : (
                              <WebView
                                source={{ html: reply.body }}
                                startInLoadingState={true}
                              />
                            ) }
                          </Row>
                          <Row style={{ marginTop: 10, alignItems: 'center' }}>
                            <Icon name='ios-heart-outline' style={{ color: '#a7a7a7' }} onPress={() => this.handleVote(reply.author, reply.permlink)} />
                            <Col style={{ alignItems: 'flex-end' }}>
                              <Text note>$ { reply.estimated_payout }</Text>
                            </Col>
                          </Row>
                        </Grid>
                      ) }
                    </Row>
                  ) }
                </Grid>
              </Row>
            </Grid>
          </Content>
          <ActionButton
            buttonColor='#FFF'
            renderIcon={active => active ? <Icon name='ios-heart' dark /> : <Icon name='ios-heart-outline' dark />}
            onPress={() => this.handleVote()}
          />
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.account.profile,
    replies: state.posts.replies,
    isRepliesFetching: state.posts.fetchingReplies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostReplies: (author, permalink) => dispatch(PostActions.postRepliesRequest(author, permalink)),
    doVote: (author, permalink) => dispatch(PostActions.postVoteRequest(author, permalink))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostScreen)
