import { StackNavigator } from 'react-navigation'
import NewPostScreen from '../Containers/NewPostScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import HighlightScreen from '../Containers/HighlightScreen'
import TagScreen from '../Containers/TagScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  NewPostScreen: { screen: NewPostScreen },
  ProfileScreen: { screen: ProfileScreen },
  HighlightScreen: { screen: HighlightScreen },
  TagScreen: { screen: TagScreen },
  HomeScreen: { screen: HomeScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
