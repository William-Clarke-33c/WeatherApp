import React, { Component } from "react";
import {MaterialCommunityIcons} from "react-native-vector-icons";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class Weather extends React.Component {
    render() {
      return(
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.tempText}>Temperature˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Weather</Text>
            </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 48,
        color: 'blue'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom:40
    },
    title:{
        fontSize: 48,
        color: 'blue'
    }
});

export default Weather;