import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import {
  StyleProvider,
  Container,
  Content,
  Header,
  Left,
  Body,
  Title,
  Subtitle,
  Right,
  Button,
  Icon,
  Text,
  Thumbnail
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import Markdown from 'react-native-easy-markdown'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/SinglePostScreenStyle'
import Images from '../Themes/Images'

const stylesMarkdown = {
  image: {
    width: Dimensions.get('window').width - 30,
    height: 300,
    marginVertical: 15
  }
}

class SinglePostScreen extends Component {
  render () {
    const { goBack, navigate, state: navigationState } = this.props.navigation
    const { post } = navigationState.params
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
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Header light>
            <Left>
              <Button onPress={() => goBack()}>
                <Icon name='ios-arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{ profile.name || post.author }</Title>
              <Subtitle>{ post.created }</Subtitle>
            </Body>
            <Right>
              <Button>
                <Icon name='share' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Grid>
              <Row style={{ padding: 15, backgroundColor: '#FFF' }}>
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 32 }}>{ post.title }</Text>
              </Row>
              <Row style={{ backgroundColor: '#FFF', padding: 15 }}>
                <Markdown markdownStyles={stylesMarkdown}>{ post.body }</Markdown>
              </Row>
              <Row style={{ marginVertical: 20 }}>
                <Grid>
                  <Row style={{ padding: 7.5, backgroundColor: '#FFF', alignItems: 'center' }} onPress={() => navigate('NewPostScreen')}>
                    <Thumbnail small source={Images.avatar} style={{ marginRight: 10 }} />
                    <Text note>Write a response...</Text>
                  </Row>
                  <Row style={{ flexDirection: 'column', marginTop: 5 }}>
                    <Grid style={{ marginTop: 10, padding: 15, backgroundColor: '#FFF' }}>
                      <Row>
                        <Thumbnail small source={Images.avatar} style={{ marginRight: 10 }} />
                        <Col style={{ alignItems: 'flex-start' }}>
                          <Text>Aji Kisworo Mukti</Text>
                          <Text note>10 Maret 2018</Text>
                        </Col>
                      </Row>
                      <Row style={{ paddingVertical: 10, borderBottomColor: '#F8F8F8', borderBottomWidth: 1 }}>
                        <Text style={{ color: '#a7a7a7' }}>A center aspect designed for efficient representation of vertically scrolling lists of changing data.</Text>
                      </Row>
                      <Row style={{ marginTop: 10, alignItems: 'center' }}>
                        <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
                        <Col style={{ alignItems: 'flex-end' }}>
                          <Text note>$424</Text>
                        </Col>
                      </Row>
                    </Grid>
                    <Grid style={{ marginTop: 10, padding: 15, backgroundColor: '#FFF' }}>
                      <Row>
                        <Thumbnail small source={Images.avatar} style={{ marginRight: 10 }} />
                        <Col style={{ alignItems: 'flex-start' }}>
                          <Text>Aji Kisworo Mukti</Text>
                          <Text note>10 Maret 2018</Text>
                        </Col>
                      </Row>
                      <Row style={{ paddingVertical: 10, borderBottomColor: '#F8F8F8', borderBottomWidth: 1 }}>
                        <Text style={{ color: '#a7a7a7' }}>A center aspect designed for efficient representation of vertically scrolling lists of changing data.</Text>
                      </Row>
                      <Row style={{ marginTop: 10, alignItems: 'center' }}>
                        <Icon name='ios-heart' style={{ color: '#a7a7a7' }} />
                        <Col style={{ alignItems: 'flex-end' }}>
                          <Text note>$424</Text>
                        </Col>
                      </Row>
                    </Grid>
                  </Row>
                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostScreen)
