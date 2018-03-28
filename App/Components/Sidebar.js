import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import {
  Container,
  Content,
  List,
  ListItem,
  Separator,
  Text,
  Thumbnail
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
// import styles from './Styles/SidebarStyle'

import Images from '../Themes/Images'

class Sidebar extends Component {
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
    const logout = this.props.logout
    const { json_metadata } = this.props.profile

    let jsonMetadata = JSON.parse(json_metadata)
    let profile = {
      name: jsonMetadata.profile.name,
      image: jsonMetadata.profile.profile_image
    }
    return (
      <Container style={{ backgroundColor: '#EEEEEE' }}>
        <Grid>
          <Row size={1.5} style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 35 }}>
            <Thumbnail large source={{ uri: profile.image }} />
            <Text style={{ marginTop: 20 }}>{profile.name}</Text>
            <Text note style={{ marginTop: 15 }} onPress={() => navigate('ProfileScreen')}>See profile</Text>
          </Row>
          <Row size={2.5}>
            <Content style={{ marginTop: 20 }}>
              <List>
                <ListItem noBorder onPress={() => navigate('HomeScreen')}>
                  <Text style={{ marginLeft: 20 }}>Home</Text>
                </ListItem>
                <ListItem noBorder onPress={() => navigate('HighlightScreen')}>
                  <Text style={{ marginLeft: 20 }}>Highlights</Text>
                </ListItem>
                <ListItem noBorder onPress={() => navigate('TagScreen')}>
                  <Text style={{ marginLeft: 20 }}>Tags</Text>
                </ListItem>
                <Separator style={{ backgroundColor: '#EEEEEE' }} />
                <ListItem noBorder onPress={() => navigate('NewPostScreen')}>
                  <Text style={{ marginLeft: 20 }}>New post</Text>
                </ListItem>
                <ListItem noBorder onPress={() => navigate('WalletScreen')}>
                  <Text style={{ marginLeft: 20 }}>Wallet</Text>
                </ListItem>
              </List>
            </Content>
          </Row>
          <Row size={0.5} style={{ alignItems: 'center', paddingLeft: 35 }}>
            <Thumbnail small source={Images.logoIcon} />
            <Text note style={{ marginHorizontal: 15, padding: 5 }}>Settings</Text>
            <Text note style={{ marginHorizontal: 15, padding: 5 }} onPress={() => this.props.logout()}>Sign out</Text>
          </Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.account.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
