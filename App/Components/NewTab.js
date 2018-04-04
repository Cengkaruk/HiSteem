import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native'
import { Content, Spinner } from 'native-base'
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
        { this.props.posts.fetching ? (
          <Spinner />
        ) : (
          <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.created} />
        ) }
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
    getPostNew: (force = false) => dispatch(PostActions.postNewRequest(force))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTab)
