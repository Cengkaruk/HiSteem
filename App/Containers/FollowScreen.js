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
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/FollowScreenStyle'

class FollowScreen extends Component {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowScreen)
