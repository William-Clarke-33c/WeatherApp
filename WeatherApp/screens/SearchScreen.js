import React, { Component } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

class Search extends React.Component {
    render() {
      return(
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1}}>
            <View style={{ height: 80, backgroundColor: 'white',
                  borderBottomWidth: 1, borderColor: '#dddddd' }}>
              <Icons style={{ paddingLeft: 10, color: 'blue'}}
                    onPress={() => navigation.navigate('Search')}
                    name="md-search" size={30} />
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
    }
});

export default Search;