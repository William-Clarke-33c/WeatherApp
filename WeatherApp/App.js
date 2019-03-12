import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';


//Screens
import WelcomeScreen from "./screens/WelcomeScreen";
import Weather from "./screens/WeatherScreen";
import Radar from "./screens/RadarScreen";
import Surf from "./screens/SurfScreen"
import Search from "./screens/SearchScreen"






class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
export default App;

/*** Screens ***/

class DashBoardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
}


class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

/*** Navigators ***/

const DashboardTabNavigator = createBottomTabNavigator({
  WEATHER: {
    screen: Weather,
    navigationOptions: {
      tabBarLabel: 'WEATHER',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='weather-cloudy' color={tintColor}
          size={24} />
      )
    }
  },
  RADAR: {
    screen: Radar,
    navigationOptions: {
      tabBarLabel: 'RADAR',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='radar' color={tintColor}
          size={24} />
      )
    }
  },
  SURF: {
    screen: Surf,
    navigationOptions: {
      tabBarLabel: 'SURF',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='waves' color={tintColor}
          size={24} />
      )
    }
  }
}, {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes
      [navigation.state.index];
      return {
        headerTitle:
          <Text style={{ color: 'white', fontWeight: '500', fontFamily: 'Helvetica-Bold', fontSize: 18 }}>{routeName}</Text>
      };
    }
  });

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  Search: Search,
  Settings: Settings
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icons style={{ paddingLeft: 10, color: 'white' }}
            onPress={() => navigation.navigate('Search')}
            name="md-search" size={30} />
        ),
        headerRight: (
          <Icons style={{ paddingRight: 10, color: 'white' }}
            onPress={() => navigation.navigate('Settings')}
            name="md-settings" size={30} />
        ),
        headerStyle: {
          backgroundColor: '#1C9CF6',
        }
      }
    }
  });


const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: DashboardStackNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);


/*** Styling ***/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
