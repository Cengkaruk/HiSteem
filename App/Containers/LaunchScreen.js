import React, { Component } from 'react'
import {
  Container,
  Text
} from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import { Images } from '../Themes'

// Styles
// import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <Container style={{ backgroundColor: '#EEEEEE' }}>
        <Grid>
          <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Lora-Bold', fontSize: 64 }}>HiSteem</Text>
          </Row>
        </Grid>
      </Container>
    )
  }
}
