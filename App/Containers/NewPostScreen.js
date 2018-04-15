import React, { Component } from 'react'
import { View } from 'react-native'
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
  Text,
  Spinner
} from 'native-base'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import TagInput from 'react-native-tag-input'
import PostActions from '../Redux/PostRedux'
import MarkdownEditor from '../Components/MarkdownEditor'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/NewPostScreenStyle'

class NewPostScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      tags: [],
      parentAuthor: null,
      parentPermalink: null,
      text: '',
      modal: {
        noTitle: false,
        tag: false
      }
    }
  }

  onChangeText = (value) => {
    this.setState({ content: value })
  }

  onTagChangeText = (text) => {
    this.setState({ text })

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: '',
      });
    }
  }


  handlePrePublish = () => {
    let headerRegex = /^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm
    let titles = this.state.content.match(headerRegex)

    if (!titles) {
      this.setState({ modal: { noTitle: true } })
    }

    let title = titles[0].replace(/^(\#{1,6})+/gm, '')
    title = title.trim()
    this.setState({ title: title })

    this.setState({ modal: { tag: true } })
  }

  handlePublish = () => {
    this.setState({ modal: { tag: false } })

    this.props.postComment(
      this.state.parentAuthor,
      this.state.parentPermalink,
      this.state.title,
      this.state.content,
      this.state.tags
    )
  }

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
              <Button onPress={this.handlePrePublish}>
                <Text>Publish</Text>
              </Button>
            </Right>
          </Header>
          <MarkdownEditor onChangeText={this.onChangeText} />
          <Modal
            isVisible={this.state.modal.noTitle}
            onBackButtonPress={() => this.setState({ modal: { noTitle: false } })}
            onBackdropPress={() => this.setState({ modal: { noTitle: false } })}>
              <View style={{ backgroundColor: '#FFF', padding: 20, alignItems: 'center' }}>
                <Text>Title not found in your content. Use # at first of sentence, or just press H button in editor.</Text>
                <Button transparent info style={{ alignSelf: 'flex-end', marginTop: 20 }}
                  onPress={() => this.setState({ modal: { noTitle: false } })}>
                  <Text>Ok</Text>
                </Button>
              </View>
          </Modal>
          <Modal
            isVisible={this.state.modal.tag}
            onBackButtonPress={() => this.setState({ modal: { tag: false } })}
            onBackdropPress={() => this.setState({ modal: { tag: false } })}>
              <View style={{ height: 200, backgroundColor: '#FFF', padding: 20, alignItems: 'center' }}>
                <Text>{this.state.title}</Text>
                <TagInput
                  value={this.state.tags}
                  onChange={(tags) => this.setState({ tags })}
                  labelExtractor={(tag) => tag}
                  text={this.state.text}
                  onChangeText={this.onTagChangeText}
                  inputProps={{ autoFocus: true, placeholder: 'Set tags here', style: { width: 300 } }}
                />
                <Button transparent info style={{ alignSelf: 'flex-end', marginTop: 20 }}
                  onPress={this.handlePublish}>
                  <Text>Publish</Text>
                </Button>
              </View>
          </Modal>
          <Modal
            isVisible={this.props.posts.new.fetching}>
              <View style={{ backgroundColor: '#FFF', padding: 20, alignItems: 'center' }}>
                <Spinner />
                <Text>Posting...</Text>
              </View>
          </Modal>
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
    postComment: (parentAuthor = null, parentPermalink = null, title, body, tags) => dispatch(PostActions.postCommentRequest(parentAuthor, parentPermalink, title, body, tags))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostScreen)
