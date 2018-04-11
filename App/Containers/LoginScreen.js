import React, { Component } from 'react'
import { Linking } from 'react-native'
import {
  StyleProvider,
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast,
  Spinner
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    this.props.attemptLogin(username, password)
  }

  handlePressSignup = () => {
    let url = 'https://signup.steemit.com'
    Linking.openURL(url)
      .catch(error => {
        Toast.show({
          text: 'Can\'t open Signup link',
          position: 'bottom',
          buttonText: 'Okay'
        })
      })
  }

  render () {
    return (
      <StyleProvider style={getTheme()}>
        <Container style={{ backgroundColor: '#EEEEEE' }}>
          <Content>
            <Grid>
              <Row style={{ flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
                <Text style={{ fontFamily: 'Lora-Bold', fontSize: 64 }}>{'HiSteem'}</Text>
                <Text style={{ marginTop: 20, fontFamily: 'Cabin-Regular', fontSize: 18 }}>{'Your voice is worth something'}</Text>
              </Row>
              { this.props.fetching ? (
                <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Spinner />
                </Row>
              ) : (
                <Grid>
                  <Row style={{ flexDirection: 'column', padding: 10 }}>
                    <Form>
                      <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                          returnKeyType='next'
                          autoCapitalize='none'
                          autoCorrect={false}
                          onChangeText={this.handleChangeUsername}
                        />
                      </Item>
                      <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input
                          keyboardType='default'
                          returnKeyType='go'
                          autoCapitalize='none'
                          autoCorrect={false}
                          secureTextEntry
                          onChangeText={this.handleChangePassword}
                        />
                      </Item>
                    </Form>
                    <Button light block style={{ marginTop: 30, marginHorizontal: 20 }} onPress={this.handlePressLogin}>
                      <Text>Sign in</Text>
                    </Button>
                  </Row>
                  <Row style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginTop: 20, paddingBottom: 20 }}>
                    <Text note>Don't have an account? <Text note style={{ color: '#000' }} onPress={this.handlePressSignup}>Sign up</Text></Text>
                    <Text note>Credentials are stored on your device.</Text>
                  </Row>
                </Grid>
              )}
            </Grid>
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
