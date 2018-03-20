import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native'
import {
  Container,
  Text,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Images from '../Themes/Images'
import styles from './Styles/CarouselItemStyle'

const { width, height } = Dimensions.get('window')

export default class CarouselItem extends Component {
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
    return (
      <Container style={{ backgroundColor: '#FFF', height: 240, marginRight: 15, borderRadius: 5 }}>
        <Grid>
          <Row>
            <Image source={Images.imagePlaceholder} resizeMode="cover" style={{ height: 110, width: width - 30 }} />
          </Row>
          <Row size={1} style={{ flexDirection: 'column', padding: 20, paddingTop: 30 }}>
            <Text style={{ fontFamily: 'Cabin-Bold' }}>I tried 7 different morning routines and i tried 7 different morning routines again</Text>
            <Text note style={{ marginTop: 20 }}>Aji Kisworo Mukti</Text>
            <Text note>11/09/2017</Text>
          </Row>
        </Grid>
      </Container>
    )
  }
}
