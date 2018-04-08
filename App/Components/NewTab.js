import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Content, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'
import PostList from './PostList'

// import styles from './Styles/NewTabStyle'

class NewTab extends Component {
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
  componentDidMount () {
    this.props.getPostNew()
  }

  handleRefresh = () => {
    this.props.getPostNew(true)
  }

  handleLoadMore = () => {
    this.props.getPostNew(true, true)
  }

  render () {
    return (
      <Content
        refreshControl={
          <RefreshControl
            refreshing={this.props.posts.fetching}
            onRefresh={this.handleRefresh}
          />
        }
      >
        <Grid>
          <Row>
            <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.created} />
          </Row>
          <Row style={{ padding: 20, justifyContent: 'center' }}>
            <Button transparent dark onPress={this.handleLoadMore}>
              <Text>Load More</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
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
    getPostNew: (force = false, next = false) => dispatch(PostActions.postNewRequest(force, next))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTab)
