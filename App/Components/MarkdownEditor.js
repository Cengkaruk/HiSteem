import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  TextInput
} from 'react-native'
import {
  Button,
  Icon,
  Text
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import styles from './Styles/MarkdownEditorStyle'

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

  render () {
    let defaultValue = '# Title here\n\nContent here'
    return (
      <Grid>
        <Row style={{ backgroundColor: '#FFF', padding: 5 }}>
          <TextInput
            multiline={true}
            autoFocus={true}
            defaultValue={defaultValue}
            underlineColorAndroid='transparent'
            textAlignVertical='top'
          />
        </Row>
        <Row style={{ height: 45, backgroundColor: '#EEE' }}>
          <Grid>
            <Col style={{ flexDirection: 'row' }}>
              <Button transparent>
                <Icon name='header' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='paragraph' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='quote-left' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='list-ul' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='link' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='ellipsis-h' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
              <Button transparent>
                <Icon name='at' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
            </Col>
            <Col style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Button transparent>
                <Icon name='picture-o' type='FontAwesome' style={{ fontSize: 16, color: '#6b6b6b', marginLeft: 10, marginRight: 10 }} />
              </Button>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }
}
