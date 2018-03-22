import React, { Component } from 'react'
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
import Markdown from 'react-native-showdown'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/SinglePostScreenStyle'
import Images from '../Themes/Images'

class SinglePostScreen extends Component {
  render () {
    const { goBack, navigate } = this.props.navigation
    let markdown = 'Halo Komunitas Steemit\n\n Nama saya Aji Kisworo Mukti, teman-teman memanggil saya Cengkaruk atau Ceng. Saya senang dengan panggilan ini karena terkesan maskulin dalam bahasa indonesia, if you know what i mean. Saya berasal dan bertempat tinggal di Yogyakarta.\n\n ![2017-12-18 11.41.20.jpg](https://steemitimages.com/DQmZhR6vUQnE3PNP9WeCvc56greiQ2Qu2hp4bwgs6ecujKz/2017-12-18%2011.41.20.jpg) \n\n Saya seorang programmer dan saat ini sedang belajar mengenai Blockchain, teknologi dibalik Steemit dan beberapa produk revolusioner lain. Saya berencana akan menulis beberapa hal mendasar mengenai teknologi ini dengan penjelsan yang sederhana dan menggunakan bahasa indonesia. Tentang bagaimana teknologi baru ini akan mengubah peradaban setelah Internet.\n\n ![2018-01-04 22.29.34.jpg](https://steemitimages.com/DQmRTveGMH9GpKy9BTnV8vTXLCFcu2RySq9LdD9RvJFNc1g/2018-01-04%2022.29.34.jpg)\n\n > *Saya sebagai pembicara saat acara Developer Circle Meetup Yogyakarta beberapa waktu lalu*\n\n Mungkin itu perkenalan dari saya, terima kasih. Oh iya, editor untuk menulis ini menggunakan `Markdown` dan masih membingungkan untuk pengguna biasa. Saya berharap team Steemit memperbaikinya, atau apakah saya bisa berkontribusi?\n\n ___\n\n Hi Steemit community\n\n My name is Aji Kisworo Mukti, my friends called me Cengkaruk or Ceng. I like this nickname because have masculinity meaning in bahasa indonesia, if you know what i mean. Im from and live in Yogyakarta.\n\n Im a programmer and right know i learn about Blockchain, the technology behind Steemit and another revolutioner products. I have a plan to write about basic of this technology with simple explanation and using bahasa indonesia. About how this new technology will changes civilisation after the Internet.\n\n **PHOTO**\n\n > *Me as a speaker at Developer Circle Meetup Yogyakarta last week*\n\n Thats the little introduction from me, thank you. One more thing, this "create a post" editor are using `Markdown` and will be confusing to normal user. I hope Steemit team do the enhancement, or can i contribute?\n\n ---\n\n [Markdown Syntax] https://daringfireball.net/projects/markdown/syntax'
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
              <Title>by Aji Kisworo Mukti</Title>
              <Subtitle>10 March 2018</Subtitle>
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
                <Text style={{ fontFamily: 'Cabin-Bold', fontSize: 32 }}>Quick brown fox jump over the lazy dog</Text>
              </Row>
              <Row style={{ backgroundColor: '#FFF' }}>
                <Markdown body={markdown} />
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
