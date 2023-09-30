// https://api.weatherapi.com/v1/forecast.json?key=e8e01d5dc188479b842113709232909&q=${this.state.countryname}&days=1&aqi=no&alerts=no
import React, { Component } from "react"
import { Alert, View, Text, TouchableOpacity, StyleSheet as Stylesheet, TextInput} from 'react-native'
import axios from 'axios'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      countryName: '',
      temperatureCelsius: '',
      temperatureFeelsLike: ''
    }
  }

  getData() {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=e8e01d5dc188479b842113709232909&q=${this.state.countryName}&days=1&aqi=no&alerts=no`)
    .then((response)=>{
      console.log(response)
      console.log(response.data)
      console.log(response.data.current.temp_c+" degrees celsius")
      this.setState({
        temperatureCelsius: response.data.current.temp_c,
        temperatureFeelsLike: response.data.current.feelslike_c
      })
    })
    .catch((error)=>{
      Alert.alert("This place does not exist else the servers are going under renovation/upgrades")
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titleText}> Weather for Cyclers </Text>
        <TextInput style={styles.input} placeholder={"Enter your country"} onChangeText={(text)=>{
          this.setState({
            countryName: text
          })
        }}/>
        
        <TouchableOpacity onPress={()=>{
          this.getData();
        }}>
          <Text style={styles.text}> Click to check if the weather is alright to cycle in </Text>
        </TouchableOpacity>
        <Text style={styles.text}> How hot it actually is: {this.state.temperatureCelsius} degrees celsius</Text>
        <Text style={styles.text}> How hot it feels like: {this.state.temperatureFeelsLike} degrees celsius</Text>
      </View>
    )
  }
}

const styles = Stylesheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 50,
    padding: 20,
    color: "white",
    alignSelf: 'center'
  },
  text:{
    color:'white', 
    fontWeight:'bold', 
    padding: 20, 
    alignSelf:'center',
    fontSize: 20,
  },
  input: {
    color: 'white',
    justifyContent:'center',
    alignSelf: 'center',
    padding: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white"
  }
});
