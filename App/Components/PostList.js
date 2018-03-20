import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Dimensions, Image } from 'react-native'
import {
  Icon,
  Text,
  List,
  ListItem,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import styles from './Styles/PostListStyle'

import Images from '../Themes/Images'

const { width, height } = Dimensions.get('window')

export default class PostList extends Component {
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

  renderFirstPostItem = () => {
    return (
      <Grid style={{ padding: 15, marginBottom: 5, backgroundColor: '#FFF' }}>
        <Row style={{ alignItems: 'center' }}>
          <Icon name="ios-heart" style={{ color: '#a7a7a7' }} />
          <Text note style={{ marginLeft: 10 }}>Wiku Baskoro and 35 others</Text>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Image source={Images.imagePlaceholder} resizeMode="cover" style={{ width: width - 30, height: 240, borderRadius: 5 }} />
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Text style={{ fontFamily: 'Cabin-Bold' }}>I tried 7 different morning routines and i tried 7 different morning routines again</Text>
        </Row>
        <Row style={{ alignItems: 'center', marginTop: 15 }}>
          <Thumbnail small source={Images.avatar} />
          <Grid style={{ marginLeft: 10 }}>
            <Col>
              <Text note>Aji Kisworo Mukti</Text>
              <Text note>11/09/2017</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text note>$324</Text>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }

  renderPostItem = () => {
    return (
      <Grid style={{ padding: 15, marginBottom: 5, backgroundColor: '#FFF' }}>
        <Row style={{ alignItems: 'center' }}>
          <Icon name="ios-heart" style={{ color: '#a7a7a7' }} />
          <Text note style={{ marginLeft: 10 }}>Wiku Baskoro and 35 others</Text>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Grid>
            <Col style={{ justifyContent: 'center' }}>
              <Text style={{ fontFamily: 'Cabin-Bold' }}>I tried 7 different morning routines and i tried 7 different morning routines again</Text>
            </Col>
            <Col>
              <Image source={Images.imagePlaceholder} resizeMode="cover" style={{ width: (width / 2) - 15, height: 100, borderRadius: 5 }} />
            </Col>
          </Grid>
        </Row>
        <Row style={{ alignItems: 'center', marginTop: 15 }}>
          <Thumbnail small source={Images.avatar} />
          <Grid style={{ marginLeft: 10 }}>
            <Col>
              <Text note>Aji Kisworo Mukti</Text>
              <Text note>11/09/2017</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text note>$324</Text>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }

  render () {
    let items = [1, 2, 3, 4, 5]
    return (
      <Grid>
        <Row style={{ padding: 15, height: 50 }}>
          <Text style={{ fontFamily: 'Cabin-Bold' }}>People you follow</Text>
        </Row>
        <Row>
          <List dataArray={items}
            renderRow={(item, section, index) =>
              (index === '0') ? this.renderFirstPostItem() : this.renderPostItem()
            }>
          </List>
        </Row>
      </Grid>
    )
  }
}
