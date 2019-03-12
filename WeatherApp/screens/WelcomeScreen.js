import React, { Component } from "react";
import { View, Text, StyleSheet, Button} from "react-native";

class WelcomeScreen extends React.Component {
    render() {
      return(
        <View style={styles.container}>
          <Button title="Login" onPress={() =>
          this.props.navigation.navigate('Dashboard')}></Button>
          <Button title="Sign Up" onPress={() => alert('button pressed')}></Button>
        </View>
      );
    }
  }
export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    }
});