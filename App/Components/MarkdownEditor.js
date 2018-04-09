import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  View,
  TextInput
} from 'react-native'
import {
  Button,
  Icon,
  Text,
  Item,
  Input
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Modal from 'react-native-modal'
import styles from './Styles/MarkdownEditorStyle'
import regexValidator from '../Lib/webLinkValidator'

export default class MarkdownEditor extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor (props) {
    super(props)

    this.state = {
      text: '# Title here\n\nContent here',
      selection: { start: 0, end: 0 },
      modal: {
        link: false,
        image: false
      },
      linkURL: ''
    }
  }

  onChangeText = (input) => {
    this.setState({ text: input })
    this.props.onChangeText(input)
  }

  onSelectionChange = (event) => {
    this.setState({
      selection: event.nativeEvent.selection,
    })
  }

  setLinkModalVisible = (visible) => {
    this.setState({ modal: { link: visible } })
  }

  setImageModalVisible = (visible) => {
    this.setState({ modal: { image: visible } })
  }

  replaceBetween = (text, selection, what) => {
    return text.substring(0, selection.start) + what + text.substring(selection.end)        
  }

  isStringWebLink = (text) => {
    const pattern = regexValidator
    return pattern.test(text)
  }

  // NOTE: Code borrowed from https://github.com/kunall17/react-native-markdown-editor
  applyListFormat = (prefix) => {
    let { text, selection } = this.state
    text = text || ''
    let newText
    let newSelection
    if (selection.start !== selection.end) {
      newText = this.replaceBetween(
        text,
        selection,
        `${prefix} ${text.substring(selection.start, selection.end)}\n`,
      )
      newSelection = { start: selection.end + 3, end: selection.end + 3 }
    } else if (
      selection.start === selection.end &&
      text.substring(selection.end - 1, selection.end) === '\n'
    ) {
      newText = this.replaceBetween(text, selection, `${prefix} `)
      newSelection = { start: selection.start + 2, end: selection.start + 2 }
    } else {
      newText = this.replaceBetween(text, selection, `\n${prefix} `)
      newSelection = { start: selection.start + 3, end: selection.start + 3 }
    }

    this.setState({ text: newText, selection: newSelection })
  }

  applyWebLinkFormat = (writeUrlTextHere) => {
    writeUrlTextHere = (writeUrlTextHere) ? writeUrlTextHere : 'https://example.com'
    const writeTextHereString = 'Write some text here'
    const { selection, text } = this.state
    let newText
    let newSelection
    const selectedText = text.substring(selection.start, selection.end)
    if (selection.start !== selection.end) {
      if (this.isStringWebLink(selectedText)) {
        newText = this.replaceBetween(text, selection, `[${writeTextHereString}](${selectedText})`)
        newSelection = {
          start: selection.start + 1,
          end: selection.start + 1 + writeTextHereString.length,
        }
      } else {
        newText = this.replaceBetween(text, selection, `[${selectedText}](${writeUrlTextHere})`)
        newSelection = {
          start: selection.end + 3,
          end: selection.end + 3 + writeUrlTextHere.length,
        }
      }
    } else {
      newText = this.replaceBetween(text, selection, `[${writeTextHereString}](${writeUrlTextHere})`)
      newSelection = {
        start: selection.start + 1,
        end: selection.start + 1 + writeTextHereString.length,
      }
    }
    this.setState({ text: newText, selection: newSelection })
  }

  formatHeader = () => {
    let prefix = '#'
    this.applyListFormat(prefix)
  }

  formatQuote = () => {
    let prefix = '\t\t'
    this.applyListFormat(prefix)
  }

  formatList = () => {
    let prefix = '-'
    this.applyListFormat(prefix)
  }

  formatMore = () => {
    let prefix = '___'
    this.applyListFormat(prefix)
  }

  formatLink = () => {
    this.applyWebLinkFormat(this.state.linkURL)
    this.setState({ linkURL: '' })
    this.setLinkModalVisible(false)
  }

  render () {
    let defaultValue = '# Title here\nContent here'
    return (
      <Grid>
        <Row style={{ backgroundColor: '#FFF', padding: 5 }}>
          <TextInput
            multiline={true}
            autoFocus={true}
            underlineColorAndroid='transparent'
            textAlignVertical='top'
            onChangeText={this.onChangeText}
            onSelectionChange={this.onSelectionChange}
            value={this.state.text}
          />
        </Row>
        <Row style={{ height: 45, backgroundColor: '#EEE' }}>
          <Grid>
            <Col style={{ flexDirection: 'row' }}>
              <Button transparent onPress={this.formatHeader}>
                <Icon name='header' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent onPress={this.formatQuote}>
                <Icon name='quote-left' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent onPress={this.formatList}>
                <Icon name='list-ul' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent onPress={() => this.setLinkModalVisible(true)}>
                <Icon name='link' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent onPress={this.formatMore}>
                <Icon name='ellipsis-h' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
            </Col>
            <Col style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button transparent>
                <Icon name='picture-o' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
            </Col>
          </Grid>
        </Row>
        <Modal
          isVisible={this.state.modal.link}
          onBackButtonPress={() => this.setLinkModalVisible(false)}
          onBackdropPress={() => this.setLinkModalVisible(false)}>
            <View style={{ backgroundColor: '#FFF', padding: 20 }}>
              <Item regular>
                <Input
                  placeholder='Type URL in here'
                  value={this.state.linkURL}
                  onChangeText={(text) => this.setState({ linkURL: text })}
                  />
              </Item>
              <Button light small style={{ alignSelf: 'flex-end', marginTop: 10 }}
                onPress={this.formatLink}>
                <Text>Set</Text>
              </Button>
            </View>
        </Modal>
      </Grid>
    )
  }
}
