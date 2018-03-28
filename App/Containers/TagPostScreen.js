import React, { Component } from 'react'
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  Text,
  Spinner
} from 'native-base'
import { connect } from 'react-redux'
import PostList from '../Components/PostList'
import PostActions from '../Redux/PostRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/TagPostScreenStyle'

class TagPostScreen extends Component {
  componentDidMount () {
    const { state: navigationState } = this.props.navigation
    const { name } = navigationState.params

    this.props.getPostTag(name)
  }

  render () {
    const { goBack, state: navigationState } = this.props.navigation
    const { name } = navigationState.params
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header>
            <Left>
              <Button transparent onPress={() => goBack()}>
                <Icon name='ios-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Tag - { name }</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            { this.props.posts.fetching ? (
              <Spinner />
            ) : (
              <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.tags} />
            )}
          </Content>
        </Container>
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
    getPostTag: (tag) => dispatch(PostActions.postTagRequest(tag))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPostScreen)
