import React, { Component } from 'react'
import {
  StyleProvider,
  Drawer,
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import Sidebar from '../Components/Sidebar'
import PostCarousel from '../Components/PostCarousel'
import PostList from '../Components/PostList'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => {
    this.drawer._root.open()
  }

  render () {
    return (
      <StyleProvider style={getTheme()}>
        <Drawer
          ref={(ref) => { this.drawer = ref }}
          content={<Sidebar navigation={this.props.navigation} />}
          onClose={() => this.closeDrawer()} >
          <Container style={{ backgroundColor: '#EEEEEE' }}>
            <Header>
              <Left>
                <Button transparent onPress={() => this.openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Home</Title>
              </Body>
              <Right />
            </Header>
            <Content>
              <Grid>
                <Row>
                  <PostCarousel navigation={this.props.navigation} />
                </Row>
                <Row>
                  <PostList navigation={this.props.navigation} />
                </Row>
              </Grid>
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
