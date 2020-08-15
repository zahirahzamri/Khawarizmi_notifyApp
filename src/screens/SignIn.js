import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Platform, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Container, Form } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';

export default class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      fontsLoaded: false,
    };
  }
  setEmail = (value) =>{
    this.setState({ email: value });
  }

  setPassword = (value) =>{
      this.setState({ password: value});
  }

  getLogin = () => {
    try {
     if(this.state.email && this.state.password){
      firebase
         .auth()
         .signInWithEmailAndPassword(this.state.email, this.state.password)
         .then(() => {
          Actions.AddSubscriptions();
          })
         .catch(error => {
            // this.state({error:'Authentication failed', AppLoading: false}) ;
            Alert.alert('Status', error.toString(error));
          });
     } 
     else {
       Alert.alert('Status','Invalid Email & Password!');
     }
    } catch (error) {
        console.log(error.toString(error));
    }
  };

  async componentDidMount() {
    await Font.loadAsync({
        'Simplifica': require('../assets/fonts/Simplifica/SIMPLIFICA.ttf'),      
    });

    this.setState({ fontsLoaded: true });
  }


  render() {
    const {fontsLoaded} = this.state;

    if(fontsLoaded) {
      return (
        <Container>    
          
            <View style={styles.container}>
                <View>
                  <Text style={styles.title}>SIGN IN</Text>
                </View>

                <View>
                  <Form>
                    <TextInput  style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                placeholder='Email'
                                onChangeText={this.setEmail}/>

                    <TextInput  style={styles.input}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                placeholder='Password'
                                onChangeText={this.setPassword} />
                  </Form>
                </View>
                
                <View style={{marginTop:25}}>
                  <TouchableOpacity style= {styles.loginBtn} onPress={this.getLogin} >
                    <Text style= {{color: 'white'}}>LOG IN</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.account}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity>
                      <Text style={styles.signupBtn}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                
        
            </View>
          
        </Container>
      );
  }
  else return <AppLoading/>;
}

}

const styles = StyleSheet.create({
  
  androidHeader: {
      ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })         
  },
  container:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center', 
    fontFamily: 'Simplifica',
    fontSize: 50,
    marginBottom: 20
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 25,
    width: 250,
    padding: 5,
    marginBottom: 10
  },
  loginBtn: {
    width: 200,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  
  },
  signupBtn: {
    fontWeight: 'bold'
  }
 
});