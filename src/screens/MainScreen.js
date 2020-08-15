import React, { Component } from "react";
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar} from 'react-native';
import { Container, Content, Header, Right} from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

export default class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica.ttf'),      
    });
    this.setState({ fontsLoaded: true });
  }
  
  render() {
    const {fontsLoaded} = this.state;

    if(fontsLoaded) {
      return (
        <Container>
          <Header  style={[styles.header, styles.androidHeader]} 
                  iosBarStyle={"light-content"} 
                  androidStatusBarColor='#000'>

              <Right style={styles.right}>
                  <TouchableOpacity onPress={() => {Actions.LoginScreen();}}><Text>Log Out</Text></TouchableOpacity>
              </Right>
          </Header>
          <Content padder>
              <View style={styles.titleView}>
                  <Text style={styles.title}>HOME</Text>
              </View>
              <View style={styles.btnView}>
                  <TouchableOpacity style={styles.button} onPress={() => {Actions.AddSubscriptions();}}>
                    <Text style={styles.textBtnStyle}>ADD NEW NOTIFICATION</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => {Actions.ListScreen();}}>
                    <Text style={styles.textBtnStyle}>VIEW NOTIFICATION(S)</Text>
                  </TouchableOpacity>
              </View>
          </Content>

        </Container>
      );
  }
    else return <AppLoading/>;
  }
}
const styles = StyleSheet.create({
    header: {
      backgroundColor: '#FFF',
    },
    androidHeader: {
        ...Platform.select({
              android: {
                  paddingTop: StatusBar.currentHeight,
              }
          })         
    },
    right: {
      paddingBottom:20, 
      paddingRight: 10,
      alignItems: 'center', 
      fontWeight: 'bold',
      textAlign: 'center'
  },
    titleView: {
      backgroundColor: 'purple', 
      width: '100%', 
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      alignItems: 'center',
      justifyContent: 'center', 
      fontFamily: 'Simplifica',
      fontSize: 40,
      padding: 5,
      color: '#FFF'
    },
    button: {
      width: 200,
      textAlign: 'center',
      alignItems: 'center',
      backgroundColor: 'purple',
      padding: 25,
      borderRadius: 15,
      marginBottom: 20,
    },
    btnView: { 
      marginTop:100,
      flexDirection: 'column', 
      justifyContent:'space-between', 
      paddingHorizontal: 20,
      alignItems: 'center'
    },
    textBtnStyle: {
      color: 'white', 
      textAlign:'center', 
      fontSize:18,
      fontWeight: 'bold'
    },
  });