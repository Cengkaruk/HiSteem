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
  ListItem
} from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/FollowScreenStyle'

class FollowScreen extends Component {
  render () {
    const { goBack, state: navigationState } = this.props.navigation
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
                <ListItem>
                  <Text>{ item.name }</Text>
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
