import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'
import PostList from './PostList'

// import styles from './Styles/TrendingTabStyle'

class TrendingTab extends Component {
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
    this.props.getPostTrending()
  }

  render () {
    return (
      this.props.posts.fetching ? (
        <Spinner />
      ) : (
        <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.trending} />
      )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    navigation: state.nav,
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPostTrending: () => dispatch(PostActions.postTrendingRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingTab)
