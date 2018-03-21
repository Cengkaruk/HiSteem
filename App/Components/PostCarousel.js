import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Dimensions } from 'react-native'
import {
  Icon,
  Text
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import Carousel from 'react-native-carousel-control'
import CarouselItem from './CarouselItem'
// import styles from './Styles/PostCarouselStyle'

const { width } = Dimensions.get('window')

export default class PostCarousel extends Component {
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
    const { navigate } = this.props.navigation
    return (
      <Grid>
        <Row style={{ paddingTop: 15 }}>
          <Carousel pageWidth={width - 30}>
            <CarouselItem navigation={this.props.navigation} />
            <CarouselItem navigation={this.props.navigation} />
            <CarouselItem navigation={this.props.navigation} />
            <CarouselItem navigation={this.props.navigation} />
            <CarouselItem navigation={this.props.navigation} />
          </Carousel>
        </Row>
        <Row style={{ paddingHorizontal: 10, paddingTop: 5, alignItems: 'center', justifyContent: 'space-between' }} onPress={() => navigate('HighlightScreen')}>
          <Text note style={{ fontFamily: 'Cabin-Bold' }}>See all trending</Text>
          <Icon name='ios-arrow-forward' />
        </Row>
      </Grid>
    )
  }
}
