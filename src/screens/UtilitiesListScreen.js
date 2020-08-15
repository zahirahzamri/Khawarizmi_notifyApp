import React, { Component } from 'react';
import { Alert, StyleSheet, StatusBar, View} from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Text,  Header, Left, Right, Tab, Tabs} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import * as Font from 'expo-font';
import Tab1 from './Tab1'
import { AppLoading } from 'expo';
import firebase from 'firebase'

export default class UtilitiesListScreen extends Component {
  constructor(){
    super();
    this.state = {
      fontsLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica.ttf'),      
    });
    this.setState({ fontsLoaded: true });
  }

 // add utilities attr
  gotoAddUtilities = () => {
    Actions.AddUtilities();
  }

  Logout = () => {
    firebase
        .auth()
        .signOut()
        .then(function() {
          Actions.SignIn();
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

                <Left style={{flexDirection: 'row', paddingBottom: 20}}></Left >

                <Right style={styles.right}>
                    <Text onPress={this.Logout}>Log Out</Text>
                </Right>

            </Header>
          <Content padder>
           
                <View style={styles.titleView}>
                  <Text style={styles.title}>MY UTILITIES</Text>
                </View>

              <Tabs tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor: '#53337d'}}>

              <Tab heading="Applications" tabStyle={{backgroundColor: 'white'}} 
                  textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: '#ededed'}} 
                  activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
              <Tab1 /></Tab>

              <Tab heading="Utilities" tabStyle={{backgroundColor: 'white'}} 
                  textStyle={{color: 'black'}} activeTabStyle={{backgroundColor: '#ededed'}} 
                  activeTextStyle={{color: 'black', fontWeight: 'normal'}}>
              </Tab>
    
            </Tabs>
          
        </Content>
  
        <Footer style={{marginBottom: 35, backgroundColor: 'transparent'}}>
          <FooterTab style={{backgroundColor: 'transparent'}}>
            <Button onPress={this.gotoViewUtilities}>
            <MaterialIcons name="add-circle-outline" size={55} color="gray" />
            </Button>
          </FooterTab>
        </Footer>

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