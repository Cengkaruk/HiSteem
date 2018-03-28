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
  Text,
  Spinner
} from 'native-base'
import Sidebar from '../Components/Sidebar'
import { connect } from 'react-redux'
import TagActions from '../Redux/TagRedux'

// Styles
import getTheme from '../Themes/NativeBase/components'
// import styles from './Styles/TagScreenStyle'

class TagScreen extends Component {
  componentDidMount () {
    this.props.getTags()
  }

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
                <Title>Tags</Title>
              </Body>
              <Right>
                <Button transparent>
                  <Icon name='ios-funnel' />
                </Button>
              </Right>
            </Header>
            <Content>
              { this.props.tags.fetching ? (
                <Spinner style={{ alignSelf: 'center' }} />
              ) : (
                <List dataArray={this.props.tags.tags}
                  renderRow={(tag, section, index) =>
                    <ListItem >
                      <Text>{ tag.name }</Text>
                    </ListItem>
                  } />
              )}
            </Content>
          </Container>
        </Drawer>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(TagActions.tagRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagScreen)
