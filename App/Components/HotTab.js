import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import PostActions from '../Redux/PostRedux'
import PostList from './PostList'

// import styles from './Styles/HotTabStyle'

class HotTab extends Component {
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
    this.props.getPostHot()
  }

  render () {
    return (
      this.props.posts.fetching ? (
        <Spinner />
      ) : (
        <PostList title={false} navigation={this.props.navigation} posts={this.props.posts.hot} />
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
    getPostHot: () => dispatch(PostActions.postHotRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotTab)
