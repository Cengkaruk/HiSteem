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
  List,
  ListItem,
  Button,
  Icon,
  Text
} from 'native-base'
import Sidebar from '../Components/Sidebar'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
import styles from './Styles/TagScreenStyle'

class TagScreen extends Component {
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
        ref={(ref) => { this.drawer = ref; }}
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
                <Title>Tags</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='ios-funnel' />
                </Button>
              </Right>
            </Header>
            <Content>
              <List>
                <ListItem itemHeader>
                  <Text>A</Text>
                </ListItem>
                <ListItem >
                  <Text>A Sort</Text>
                </ListItem>
                <ListItem>
                  <Text>A The Tags</Text>
                </ListItem>
                <ListItem>
                  <Text>A Wow</Text>
                </ListItem>
                <ListItem itemHeader>
                  <Text>B</Text>
                </ListItem>
                <ListItem>
                  <Text>B Should</Text>
                </ListItem>
                <ListItem>
                  <Text>B Filter This</Text>
                </ListItem>
                <ListItem>
                  <Text>By Popularity</Text>
                </ListItem>
              </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(TagScreen)
