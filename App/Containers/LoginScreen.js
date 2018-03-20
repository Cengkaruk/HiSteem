import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  StyleProvider,
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button
} from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render () {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Content>
            <Grid>
              <Row style={{ flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
                <Text style={{ fontFamily: 'Lora-Bold', fontSize: 64 }}>{"HiSteem"}</Text>
                <Text style={{ marginTop: 20, fontFamily: 'Cabin-Regular', fontSize: 18 }}>{"Your voice is worth something"}</Text>
              </Row>
              <Row style={{ flexDirection: 'column', padding: 10 }}>
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password or Master Key</Label>
                    <Input />
                  </Item>
                </Form>
                <Button light block style={{ marginTop: 30, marginHorizontal: 20 }}>
                  <Text>Sign in</Text>
                </Button>
              </Row>
              <Row style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: 20, paddingBottom: 20 }}>
                <Text note>Don't have an account? Sign up.</Text>
                <Text note>Credentials are stored on your device.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
