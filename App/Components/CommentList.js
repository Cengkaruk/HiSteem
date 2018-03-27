import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  Icon,
  Text,
  List,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
// import styles from './Styles/CommentListStyle'

import Images from '../Themes/Images'

export default class CommentList extends Component {
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

  renderCommentItem = (comment, index) => {
    const { navigate } = this.props.navigation
    return (
      <Grid style={{ padding: 15, marginBottom: 5, backgroundColor: '#FFF' }} key={index}>
        <Row style={{ alignItems: 'center' }}>
          <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
          { comment.active_votes.length > 0 && <Text note style={{ marginLeft: 10 }}>{ comment.active_votes[0].voter } and { comment.active_votes.length - 1 } others</Text> }
        </Row>
        <Row style={{ marginTop: 10 }} onPress={() => navigate('SinglePostScreen')}>
          <Grid>
            <Col style={{ justifyContent: 'center', paddingRight: 5 }}>
              <Text>{ comment.body }</Text>
            </Col>
          </Grid>
        </Row>
        <Row style={{ alignItems: 'center', marginTop: 15 }}>
          <Grid style={{ marginLeft: 10 }}>
            <Col>
              <Text note>Reply to { comment.parent_author }</Text>
              <Text note>{ comment.root_title }</Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text note>${ comment.total_payout_value }</Text>
            </Col>
          </Grid>
        </Row>
      </Grid>
    )
  }

  render () {
    const comments = this.props.comments
    return (
      <Grid>
        <Row>
          <List dataArray={comments}
            renderRow={(comment, section, index) =>
              this.renderCommentItem(comment, index)
            } />
        </Row>
      </Grid>
    )
  }
}
