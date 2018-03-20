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
  Icon,
  Text,
  Thumbnail,
  Tabs,
  Tab
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import PostList from '../Components/PostList'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
import styles from './Styles/ProfileScreenStyle'

import Images from '../Themes/Images'

class ProfileScreen extends Component {
  render () {
    const { goBack } = this.props.navigation
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header noShadow light>
            <Left>
              <Button onPress={() => goBack()}>
                <Icon name='ios-arrow-back' />
              </Button>
            </Left>
            <Body />
            <Right>
              <Button medium dark bordered>
                <Text>Follow</Text>
              </Button>
              <Button>
                <Icon name='ios-more' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Grid style={{ backgroundColor: '#FFF' }}>
              <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Thumbnail large source={Images.avatar} />
              </Row>
              <Row style={{ flexDirection: 'column', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F8F8F8' }}>
                <Text style={{ fontSize: 24 }}>Aji Kisworo Mukti</Text>
                <Text>Man behind the machine.</Text>
              </Row>
              <Row style={{ padding: 20 }}>
                <Col>
                  <Text note>101 Following</Text>
                </Col>
                <Col>
                  <Text note>135 Followers</Text>
                </Col>
              </Row>
              <Row>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#808080' }}>
                  <Tab
                    tabStyle={{ backgroundColor: '#FFF' }}
                    activeTabStyle={{ backgroundColor: '#FFF' }}
                    activeTextStyle={{ color: '#000' }}
                    heading="Latest">
                    <PostList />
                  </Tab>
                  <Tab
                    tabStyle={{ backgroundColor: '#FFF' }}
                    activeTabStyle={{ backgroundColor: '#FFF' }}
                    activeTextStyle={{ color: '#000' }}
                    heading="Comments">
                    <Text>Comments</Text>
                  </Tab>
                  <Tab
                    tabStyle={{ backgroundColor: '#FFF' }}
                    activeTabStyle={{ backgroundColor: '#FFF' }}
                    activeTextStyle={{ color: '#000' }}
                    heading="Replies">
                    <Text>Replies</Text>
                  </Tab>
                </Tabs>
              </Row>
            </Grid>
          </Content>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
