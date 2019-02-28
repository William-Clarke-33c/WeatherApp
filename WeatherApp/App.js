import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createSwitchNavigator, 
  createDrawerNavigator,
  createBottomTabNavigator, 
  createStackNavigator, 
  createAppContainer,} from 'react-navigation';


//Screens
import WelcomeScreen from "./screens/WelcomeScreen";
import Weather from "./screens/WeatherScreen";

//API
import API_KEY from "./utils/WeatherAPIKey";



class App extends React.Component {
  constructor(props){
    super(props);

    this.state= {
      latitutde: 0,
      longitude: 0,
      forecast: [],
      error:''
    };
  }

//Gets the location of the user
  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(
          (prevState) => ({
            latitutde: position.coords.latitude,
            longitude: position.coords.longitude
          }), () => {this.getWeather();}
        );
      },
          (error) => this.setState({forecast: error.message}),
          { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
    );
  }

  //Gets the local Weather
  getWeather(){
    //Weather API
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + 
    this.state.latitude + '&lon=' + this.state.longitude + 
    API_KEY;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        this.setState((prevState,props) => ({
          forecast: data
        }));
    })
  }

  render(){
    return <AppContainer/>;
  }
}
export default App;

/*** Screens ***/

class DashBoardScreen extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Dashboard</Text>
      </View>
    );
  }
}

class Profile extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

class Settings extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

/*** Navigators ***/

const DashboardTabNavigator = createBottomTabNavigator({
  Weather,
  Profile,
  Settings,
},{
  navigationOptions: ({navigation}) => {
    const {routeName} = navigation.state.routes
    [navigation.state.index];
    return {
      headerTitle: routeName
    };
  }
});

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator
},{
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:(
        <Icon style={{ paddingLeft: 10, color: 'white'}}
          onPress={() => navigation.openDrawer()}
          name="md-menu" size={30} />
      ),
      headerRight:(
        <Icon style={{ paddingRight: 10, color: 'white'}}
        name="md-settings" size={30} />
      ),
      headerStyle :{
        backgroundColor: '#1C9CF6'
      }
    }
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  'Weather': {screen: DashboardStackNavigator },
  'Radar' : {screen: DashboardStackNavigator },
  'Surf Report': {screen: DashboardStackNavigator},
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{screen: WelcomeScreen},
  Dashboard:{screen: AppDrawerNavigator},
});

const AppContainer = createAppContainer(AppSwitchNavigator);


/*** Styling ***/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyling :{

  },
});
