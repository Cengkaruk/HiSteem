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
  Text
} from 'native-base'
import { connect } from 'react-redux'
import CommentList from '../Components/CommentList'
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/NotificationScreenStyle'

class NotificationScreen extends Component {
  render () {
    const { goBack } = this.props.navigation
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
              <Title>Notifications</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <CommentList />
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
