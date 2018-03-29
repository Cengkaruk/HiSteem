import React, { Component } from 'react'
import {
  StyleProvider,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Text
} from 'native-base'
import { connect } from 'react-redux'
import MarkdownEditor from '../Components/MarkdownEditor'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/NewPostScreenStyle'

class NewPostScreen extends Component {
  render () {
    const { goBack } = this.props.navigation
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header light>
            <Left>
              <Button onPress={() => goBack()}>
                <Icon name='close' />
              </Button>
            </Left>
            <Body>
              <Title>New post</Title>
            </Body>
            <Right>
              <Button>
                <Text>Publish</Text>
              </Button>
            </Right>
          </Header>
          <MarkdownEditor />
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

export default connect(mapStateToProps, mapDispatchToProps)(NewPostScreen)
