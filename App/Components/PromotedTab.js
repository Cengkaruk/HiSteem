import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'
import PostList from './PostList'

// import styles from './Styles/PromotedTabStyle'

class PromotedTab extends Component {
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
    this.props.getPostPromoted()
  }

  render () {
    return (
      this.props.posts.fetching ? (
        <Spinner />
      ) : (
        <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.promoted} />
      )
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
    getPostPromoted: () => dispatch(PostActions.postPromotedRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotedTab)
