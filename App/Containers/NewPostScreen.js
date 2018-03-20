import React, { Component } from 'react'
import {
  StyleProvider,
  Drawer,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  List,
  ListItem,
  Button,
  Icon,
  Text
} from 'native-base'
import { MarkdownEditor, applyListFormat, applyWrapFormat, applyWebLinkFormat } from 'react-native-markdown-editor'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/NewPostScreenStyle'

class NewPostScreen extends Component {
  render () {
    const { goBack } = this.props.navigation
    const markdownButtons = [
      { key: 'H1', title: 'H1', prefix: '#', onPress: applyListFormat },
      { key: 'B', title: 'B', wrapper: '**', onPress: applyWrapFormat, style: { fontWeight: 'bold' } },
      { key: 'I', title: 'I', wrapper: '*', onPress: applyWrapFormat, style: { fontStyle: 'italic' } },
      {
        key: 'U',
        title: 'U',
        wrapper: '__',
        onPress: applyWrapFormat,
        style: { textDecorationLine: 'underline' },
      },
      { key: 'L', title: 'L', prefix: '-', onPress: applyListFormat },
      { key: 'WEB', title: 'WEB', onPress: applyWebLinkFormat },
    ]

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
          <MarkdownEditor Formats={markdownButtons} />
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
