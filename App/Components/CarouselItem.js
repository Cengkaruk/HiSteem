import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native'
import {
  Container,
  Text
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Images from '../Themes/Images'
// import styles from './Styles/CarouselItemStyle'

const { width } = Dimensions.get('window')

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
    const { navigate } = this.props.navigation
    const post = this.props.post
    return (
      <Container style={{ backgroundColor: '#FFF', height: 240, marginRight: 15, borderRadius: 5 }}>
        <Grid>
          <Row onPress={() => navigate('SinglePostScreen')}>
            <Image source={Images.imagePlaceholder} resizeMode='cover' style={{ height: 110, width: width - 30 }} />
          </Row>
          <Row size={1} style={{ flexDirection: 'column', paddingHorizontal: 10 }} onPress={() => navigate('SinglePostScreen')}>
            <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18 }}>{ post.title }</Text>
            <Grid style={{ marginTop: 20 }}>
              <Col>
                <Text note>@{ post.author }</Text>
                <Text note>{ post.created }</Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text note>${ post.total_payout_value }</Text>
              </Col>
            </Grid>
          </Row>
        </Grid>
      </Container>
    )
  }
}
