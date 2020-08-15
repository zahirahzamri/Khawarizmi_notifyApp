import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import { Container, Form } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default class SignUpScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      username : "",
      email: "",
      password: "",
      confirmpassword: ""
    };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
        'Simplifica': require('./assets/simplifica.ttf'),      
    });

    this.setState({ fontsLoaded: true });
  }

  setUsername = (value) =>{
    this.setState({username: value});
  }
  setEmail = (value) =>{
    this.setState({email: value});
  }
  setPassword = (value)=>{
    this.setState({password:value})
  }
  setConfirmPassword=(value)=>{
    this.setState({confirmPassword:value})
  }

  sign_up = (email,password) =>{
    try {
      if (this.state.email && this.state.password){
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(user=>{
          console.log(user);
          Alert.alert('Status','You have been signed up!');
        })
        .catch(error =>{
          Alert.alert('Status',error.toString(error));
        });
       }
       else {
        Alert.alert('Status','Input is invalid!');
     }
    }
    catch(error){
      Alert.alert({errorMessage: error.message});
    }
  };

  confirm_password =() =>{
      if(this.state.password!=this.confirmPassword){
        Alert.alert('Status','Confirm password is not identical with Password');
      }
      else {
        this.sign_up()
      }
  };


  render() {
    const {fontsLoaded} = this.state;

    if(fontsLoaded) {
      return (
        <Container>    
          
            <View style={styles.container}>
                <View>
                  <Text style={styles.title}>SIGN UP</Text>
                </View>

                <View>
                  <Form>
                    <TextInput  style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                placeholder='Username'
                                onChangeText={this.setUsername}/>
                    <TextInput  style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                placeholder='Email'
                                onChangeText={this.setEmail}/>
                    <TextInput  style={styles.input}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                autoCorrect={false} 
                                placeholder='Password'
                                onChangeText={this.setPassword}/>
                    <TextInput  style={styles.input}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                autoCorrect={false} 
                                placeholder='Confirm Password'
                                onChangeText={this.setConfirmPassword}/>
    
                  </Form>
                </View>
                
                <View style={{marginTop:25}}>
                  <TouchableOpacity style= {styles.loginBtn}>
                    <Text style= {{color: 'white'}} onPress={this.sign_up}>SIGN UP</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.account}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity>
{/* ROUTING */}
                      <Text style={styles.signupBtn} onPress= {()=> this.props.navigation.navigate('SignIn')}>SIGN IN</Text>
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