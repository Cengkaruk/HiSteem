import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image } from 'react-native'
import {
  Icon,
  Text,
  List,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
// import styles from './Styles/PostListStyle'

import Images from '../Themes/Images'

const { width } = Dimensions.get('window')

export default class PostList extends Component {
  // Prop type warnings
  static propTypes = {
    title: PropTypes.bool.isRequired
  }
  
  // Defaults for props
  static defaultProps = {
    title: true
  }

  renderFirstPostItem = (post, index) => {
    const { navigate } = this.props.navigation
    let profile = {}
    if (post.profile.json_metadata) {
      let jsonMetadata = JSON.parse(post.profile.json_metadata)
      if (jsonMetadata.profile) {
        profile = {
          name: jsonMetadata.profile.name,
          image: jsonMetadata.profile.profile_image
        }
      }
    }
    let postMetadata = JSON.parse(post.json_metadata)
    return (
      <Grid style={{ padding: 15, marginBottom: 5, backgroundColor: '#FFF' }} key={index}>
        <Row style={{ alignItems: 'center' }}>
          <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
          { post.active_votes.length > 0 && <Text note style={{ marginLeft: 10 }}>{ post.active_votes[0].voter } and { post.active_votes.length - 1 } others</Text> }
        </Row>
        { (typeof postMetadata.image !== 'undefined') && (
          <Row style={{ marginTop: 10 }} onPress={() => navigate('SinglePostScreen', { post: post })}>
            <Image source={{ uri: postMetadata.image[0] }} resizeMode='cover' style={{ width: width - 30, height: 240, borderRadius: 5 }} />
          </Row>
        )}
        <Row style={{ marginTop: 10 }} onPress={() => navigate('SinglePostScreen', { post: post })}>
          <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18 }}>{ post.title }</Text>
        </Row>
        <Row style={{ alignItems: 'center', marginTop: 15 }}>
          <Thumbnail small source={{ uri: profile.image }} />
          <Grid style={{ marginLeft: 10 }}>
            <Col>
              <Text note>{ profile.name || post.author }</Text>
              <Text note>{ post.created }</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text note>${ post.total_payout_value }</Text>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }

  renderPostItem = (post, index) => {
    const { navigate } = this.props.navigation
    let profile = {}
    if (post.profile.json_metadata) {
      let jsonMetadata = JSON.parse(post.profile.json_metadata)
      if (jsonMetadata.profile) {
        profile = {
          name: jsonMetadata.profile.name,
          image: jsonMetadata.profile.profile_image
        }
      }
    }
    let postMetadata = JSON.parse(post.json_metadata)
    return (
      <Grid style={{ padding: 15, marginBottom: 5, backgroundColor: '#FFF' }} key={index}>
        <Row style={{ alignItems: 'center' }}>
          <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
          { post.active_votes.length > 0 && <Text note style={{ marginLeft: 10 }}>{ post.active_votes[0].voter } and { post.active_votes.length - 1 } others</Text> }
        </Row>
        <Row style={{ marginTop: 10 }} onPress={() => navigate('SinglePostScreen', { post: post })}>
          <Grid>
            <Col style={{ justifyContent: 'center', paddingRight: 5 }}>
              <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 18 }}>{ post.title }</Text>
            </Col>
            { (typeof postMetadata.image !== 'undefined') && (
              <Col>
                <Image source={{ uri: postMetadata.image[0] }} resizeMode='cover' style={{ width: (width / 2) - 15, height: 100, borderRadius: 5 }} />
              </Col>
            )}
          </Grid>
        </Row>
        <Row style={{ alignItems: 'center', marginTop: 15 }}>
          <Thumbnail small source={{ uri: profile.image }} />
          <Grid style={{ marginLeft: 10 }}>
            <Col>
              <Text note>{ profile.name || post.author }</Text>
              <Text note>{ post.created }</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text note>${ post.total_payout_value }</Text>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }

  render () {
    const posts = this.props.posts
    return (
      <Grid>
        { this.props.title && (
          <Row style={{ padding: 15, height: 50 }}>
            <Text style={{ fontFamily: 'Cabin-Bold' }}>People you follow</Text>
          </Row>
        )}
        <Row>
          <List dataArray={posts}
            renderRow={(post, section, index) =>
              (index === '0') ? this.renderFirstPostItem(post, index) : this.renderPostItem(post, index)
            } />
        </Row>
      </Grid>
    )
  }
}
