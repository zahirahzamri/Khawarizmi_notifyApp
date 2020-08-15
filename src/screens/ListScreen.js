import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import { Container, Content, Text, Header, Left, Right, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as firebase from 'firebase';


export default class ListScreen extends Component {
  constructor(){
    super();
    this.state = {
      fontsLoaded: false,
    }
  }

  async componentDidMount() {
   
     await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica/SIMPLIFICA.ttf'),      
      });

  this.setState({ fontsLoaded: true });
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

                <Left style={{flexDirection: 'row', paddingBottom: 20}}>
                     <Icon name='arrow-back' 
                           style={{color: 'black', marginLeft: 10}}
                     />
                </Left >

                <Right style={styles.right}>
                    <Text onPress={this.Logout}>Log Out</Text>
                </Right>

            </Header>
          <Content padder>
           
                <View style={styles.titleView}>
                  <Text style={styles.title}>MY SUBSCRIPTIONS</Text>
                </View>

                <View style={styles.btnView}>
                  <TouchableOpacity style= {styles.button}
                                    onPress={() => {Actions.Tab1();}}>
                    <Text style= {{color: 'white', fontSize: 18}}>APPLICATIONS</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style= {styles.button} onPress={Action.UtilitiesListScreen}>
                    <Text style= {{color: 'white', fontSize: 18}}>UTILITIES</Text>
                  </TouchableOpacity>
                </View>
              

        </Content>
  
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
    width: 250,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  btnView: {
    alignItems: 'center',
    marginTop:180, 
    paddingHorizontal: 20
  },
  
});
