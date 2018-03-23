import { StackNavigator } from 'react-navigation'
import SinglePostScreen from '../Containers/SinglePostScreen'
import WalletScreen from '../Containers/WalletScreen'
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
  SinglePostScreen: { screen: SinglePostScreen },
  WalletScreen: { screen: WalletScreen },
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
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
