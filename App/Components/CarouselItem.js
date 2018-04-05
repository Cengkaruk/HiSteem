import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Image, Dimensions } from 'react-native'
import {
  Container,
  Text
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Images from '../Themes/Images'
import Utils from '../Transforms/Utils'
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
    let profile = {}
    if (post.profile.json_metadata) {
      let jsonMetadata = post.profile.json_metadata
      if (jsonMetadata.profile) {
        profile = {
          name: jsonMetadata.profile.name,
          image: jsonMetadata.profile.profile_image
        }
      }
    }
    let postMetadata = post.json_metadata
    return (
      <Container style={{ backgroundColor: '#FFF', height: 240, marginRight: 15, borderRadius: 5 }}>
        <Grid>
          {(typeof postMetadata.image !== 'undefined') && (
            <Row onPress={() => navigate('SinglePostScreen', { post: post })}>
              <Image source={{ uri: postMetadata.image[0] }} resizeMode='cover' style={{ height: 110, width: width - 30 }} />
            </Row>
          )}
          <Row size={1} style={{ flexDirection: 'column', paddingHorizontal: 10 }} onPress={() => navigate('SinglePostScreen', { post: post })}>
            <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18 }}>{ post.title }</Text>
            <Grid style={{ marginTop: 20 }}>
              <Col onPress={() => navigate('ProfileScreen', { profile: post.profile })}>
                <Text note>{ profile.name || post.author }</Text>
                <Text note>{ Utils.dateToHuman(post.created) }</Text>
              </Col>
              <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Text note>${ post.estimated_payout }</Text>
              </Col>
            </Grid>
          </Row>
        </Grid>
      </Container>
    )
  }
}
