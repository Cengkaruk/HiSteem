import React, { Component } from 'react'
import { Dimensions } from 'react-native'
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
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import Markdown from 'react-native-markdown-renderer'
import PostActions from '../Redux/PostRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/SinglePostScreenStyle'
import Images from '../Themes/Images'

const stylesMarkdown = {
  image: {
    width: Dimensions.get('window').width - 30,
    height: 300,
    marginVertical: 15
  }
}

class SinglePostScreen extends Component {
  componentDidMount () {
    const { state: navigationState } = this.props.navigation
    const { post } = navigationState.params
    this.props.getPostReplies(post.author, post.permlink)
  }

  render () {
    const { goBack, navigate, state: navigationState } = this.props.navigation
    const { post } = navigationState.params
    let profile = {}
    if (post.profile.json_metadata) {
      let jsonMetadata = JSON.parse(post.profile.json_metadata)
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
              <Subtitle>{ post.created }</Subtitle>
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
                <Markdown>{ post.body }</Markdown>
              </Row>
              <Row style={{ marginVertical: 20 }}>
                <Grid>
                  <Row style={{ padding: 7.5, backgroundColor: '#FFF', alignItems: 'center' }} onPress={() => navigate('NewPostScreen')}>
                    <Thumbnail small source={Images.avatar} style={{ marginRight: 10 }} />
                    <Text note>Write a response...</Text>
                  </Row>
                  <Row style={{ flexDirection: 'column', marginTop: 5 }}>
                    { this.props.replies.map((reply, index) =>
                      <Grid style={{ marginTop: 10, padding: 15, backgroundColor: '#FFF' }} key={index}>
                        <Row>
                          <Thumbnail small source={Images.avatar} style={{ marginRight: 10 }} />
                          <Col style={{ alignItems: 'flex-start' }}>
                            <Text>{ reply.author }</Text>
                            <Text note>{ reply.created }</Text>
                          </Col>
                        </Row>
                        <Row style={{ paddingVertical: 10, borderBottomColor: '#F8F8F8', borderBottomWidth: 1 }}>
                          <Markdown>{ reply.body }</Markdown>
                        </Row>
                        <Row style={{ marginTop: 10, alignItems: 'center' }}>
                          <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
                          <Col style={{ alignItems: 'flex-end' }}>
                            <Text note>$ { reply.total_payout_value }</Text>
                          </Col>
                        </Row>
                      </Grid>
                    ) }
                  </Row>
                </Grid>
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
    replies: state.posts.replies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostReplies: (author, permalink) => dispatch(PostActions.postRepliesRequest(author, permalink))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostScreen)
