import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List, Header, Left, Right} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import * as firebase from 'firebase';
import { db } from '../config/db';
import AppNameList from '../components/AppNameList';


let appsRef = db.ref('/apps');

export default class Tab1 extends Component {
  constructor(){
    super();
    this.state = {
      apps: [],
      fontsLoaded: false,
    }
  }

  async componentDidMount() {
    appsRef.on('value', (snapshot) => {
        let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({apps: firebaseData});
            console.log(this.state.apps);
          }
     });

    await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica/SIMPLIFICA.ttf'),      
      });

    this.setState({ fontsLoaded: true });
  }

  goToAddScreen = () => {
    Actions.AddSubscriptions();
  }

  Logout = () => {
    firebase
        .auth()
        .signOut()
        .then(function() {
          Actions.LoginScreen();
         })
        .catch(function(error) {
          Alert.alert('Status', error.toString(error));
        });
  }

  render() {
    const {fontsLoaded} = this.state;

    if(fontsLoaded) {
    return (
      <Container>
        
            <Header  style={[styles.header, styles.androidHeader]} 
                     iosBarStyle={"light-content"} 
                     androidStatusBarColor='#000'>

                <Left style={{flexDirection: 'row', paddingBottom: 20}}>
                 <TouchableOpacity onPress={() => {Actions.ListScreen();}}>
                     <Icon name='arrow-back' 
                           style={{color: 'black', marginLeft: 10}}/>
                  </TouchableOpacity>
                </Left >

                <Right style={styles.right}>
                    <Text onPress={this.Logout}>Log Out</Text>
                </Right>

            </Header>
          <Content padder>
           
                <View style={styles.titleView}>
                  <Text style={styles.title}>MY APPLICATIONS</Text>
                </View>

                <List vertical={true}>
                  <AppNameList apps={this.state.apps} 
                      onPress={(subsAppName) => {Actions.UpdateSubscription({subsAppName: subsAppName});}}  
                  />
                </List>
                
                <Text>{this.props.subsAppName}</Text>

        </Content>
  
        <Footer style={{marginBottom: 35, backgroundColor: 'transparent'}}>
          <FooterTab style={{backgroundColor: 'transparent'}}>
            <Button onPress={this.goToAddScreen}>
            <MaterialIcons name="add-circle-outline" size={55} color="gray" />
            </Button>
          </FooterTab>
        </Footer >

      </Container>
    );
  }
  else return <AppLoading/>
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
    width: 155,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20
  },
  btnView: {
    marginTop:20, 
    flexDirection: 'row', 
    justifyContent:'space-between', 
    paddingHorizontal: 20
  }
});
