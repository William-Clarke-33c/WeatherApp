import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Skycons from 'react-skycons';
import { View, Text, StyleSheet, Button, FlatList, SafeAreaView, StatusBar } from "react-native";

import searchOn from '../App';
import { ScrollView } from "react-native-gesture-handler";

//API KEY
const API_KEY = "327e61548f15cd928a20cbfc8917020c";
const API_LOCATION = "7e3807834c3c06";

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitutde: 0,
      longitude: 0,
      currentForecast: [],
      hourlyForecast: [],
      dailyForecast: [],
      locationJson: [],
      error: ''
    };
  }

  async componentDidMount() {
    this.getLocation();
  }

  //Gets the location of the user
  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState(
          () => ({
            latitutde: position.coords.latitude,
            longitude: position.coords.longitude
          }), () => { this.getWeather(); }
        );
      },
      (error) => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );
  }

  //Gets the local Weather
  async getWeather() {
    //Weather API
    let url = "https://api.darksky.net/forecast/" + API_KEY + "/" +
      this.state.latitutde + "," + this.state.longitude;
    
    //Location API
    let loc = "https://us1.locationiq.com/v1/reverse.php?key=" + API_LOCATION +"&lat="+ this.state.latitutde +"&lon="
      + this.state.longitude + "&format=json";


    //Get Weather Details from Weather API
    const response = await fetch(url)
    const json = await response.json();
    this.setState({ currentForecast: json.currently });
    this.setState({ hourlyForecast: json.hourly });
    this.setState({ dailyForecast: json.daily });

    //Get City Name from Location API
    const responseCity = await fetch(loc)
    const jsonCity = await responseCity.json();
    this.setState({locationJson: jsonCity.address});
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>{this.state.latitutde}</Text>
        <Text>{this.state.longitude}</Text>
        <Text>{this.state.locationJson.city}</Text>
        <View style={{height: 85}}>
          <FlatList style={{backgroundColor: '#F6F8F7' }}data={this.state.hourlyForecast.data} horizontal keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) =>
              <View style={{
                height: 50,
                width: 50,
                margin: 5
              }}>
              <Text>
                  {`${Math.floor((item.time)/3600000)}`}
                </Text>
                <Text>
                  Image
                </Text>
                <Text>
                  {`${Math.round(item.temperature)+'°'}`}
                </Text>
              </View>}
          />
        </View>
        <Text>Lmao</Text>
        <FlatList data={this.state.dailyForecast.data} keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) =>
            <View>
              <Text>
                {`${item.icon}`}
              </Text>
            </View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Weather;