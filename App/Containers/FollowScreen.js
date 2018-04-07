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
  List,
  ListItem,
  Thumbnail
} from 'native-base'
import { connect } from 'react-redux'
import AccountActions from '../Redux/AccountRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/FollowScreenStyle'

class FollowScreen extends Component {
  onEndReached = () => {
    const { state: navigationState } = this.props.navigation
    const { username, title, items } = navigationState.params
    this.props.getFollowList(username, true)
  }

  render () {
    const { goBack, navigate, state: navigationState } = this.props.navigation
    const { title, items } = navigationState.params
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
              <Title>{ title }</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List dataArray={items}
              onEndReached={this.onEndReached}
              renderRow={(item, section, index) =>
                <ListItem avatar onPress={() => navigate('ProfileScreen', { profile: item })}>
                  <Left>
                  { item.json_metadata.profile
                    && item.json_metadata.profile.profile_image ? (
                    <Thumbnail source={{ uri: item.json_metadata.profile.profile_image }} />
                  ) : (
                    <Thumbnail source={{ uri: 'https://via.placeholder.com/150x150' }} />
                  ) }
                  </Left>
                  <Body>
                    { item.json_metadata.profile &&
                      <Text>{ item.json_metadata.profile.name }</Text>
                    }
                    <Text note>{ item.name }</Text>
                  </Body>
                  <Right />
                </ListItem>
              } />
          </Content>
        </Container>
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
    getFollowList: (username, next = false) => dispatch(AccountActions.followListRequest(username, next)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowScreen)
