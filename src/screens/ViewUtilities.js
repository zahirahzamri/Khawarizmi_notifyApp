import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, TextInput}  from 'react-native';
import { Container, Label, Content, List, Header, Left, Right, Icon, Footer, FooterTab } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { db } from '../config/db';
let subscriptionRef = db.ref('/apps');

export default class ViewUtilities extends Component {
  constructor(){
    super();
    this.state = {
      apps:[],
      utilitiesName: null,
      // since this is Utilities thus the amount to be paid for each months are vary
      duePeriod: '',
      paymentMethod: '',
      reminder: '',
      fontsLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica.ttf'),      
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    let query = subscriptionRef.orderByChild("utilitiesName").equalTo(this.props.utilitiesName);
    query.once('value', (snapshot) => {
      let data = snapshot.val();
      
      if(data){
        let firebaseData = Object.values(data);
        this.setState({apps: firebaseData},()=>{
          this.state.apps.map((element) => {
            this.setState({
              UtilitiesName: element.utilitiesName,
              paymentMethod: element.paymentMethod,
              duePeriod: element.duePeriod,
              reminder: element.reminder
            });
          });
        });
      }
     });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Simplifica': require('../assets/fonts/Simplifica.ttf'),      
    });
    this.setState({ fontsLoaded: true });
  }

  setUtilitiesName = (value) =>{
    this.setState({ sUtilitiesName: value });
  }
  selectPaymentMethod = (value) => {
    this.setState({ paymentMethod: value });
  }
  selectDuePeriod = (value) => {
    this.setState({ duePeriod: value });
  }
  selectReminder = (value) => {
    this.setState({ reminder: value });
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
                    <TouchableOpacity onPress={() => {Actions.LoginScreen();}}><Text>Log Out</Text></TouchableOpacity>
                </Right>

            </Header>
          <Content padder>
            <View style={styles.container}>
                <View style={styles.titleView}>
                  <Text style={styles.title}>VIEW UTILITIES</Text>
                </View>
                  <View style={styles.container2}>
                        <Label style={styles.subheading}>Utilities</Label>
                        <Text style={styles.textBox}> {this.props.utilitiesName} </Text>          
                  </View>
                  <View style={styles.container2}>
                        <Label style={styles.subheading}>Due Period</Label>
                        <Text style={styles.textBox}>{this.props.duePeriod}</Text>
                  </View>
                  <View style={styles.container2}>
                        <Label style={styles.subheading}>Payment method</Label>
                        <Text style={styles.textBox}>{this.props.paymentMethod}</Text>
                  </View>

                <View style={styles.btnView}>
                  <TouchableOpacity style= {styles.button}>
                    <Text style= {{color: 'white'}}>BACK</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style= {styles.button} onPress={(utilitiesName) => {Actions.UpdateUtilities({utilitiesName: utilitiesName});}}>
                    <Text style= {{color: 'white'}}>EDIT</Text>
                  </TouchableOpacity>
                </View>

        
            </View>
            </Content>
        
            <Footer>
              <FooterTab style={styles.footerTab}>
                <TouchableOpacity vertical onPress={() => {Actions.UtilitiesListScreen();}}>
                  <Icon name="list-box" style={{color:'white'}}/>
                  <Text style={{color:'white'}}>Utilities List</Text>
                </TouchableOpacity>
              </FooterTab>
            </Footer>

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
  label: {
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#431d69'
  },
  button: {
    width: 140,
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
  },
  amountBox: {
    backgroundColor: 'grey',
    alignItems: 'center',
    paddingTop: 20,
    opacity: 0.8,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    width: 245,
    paddingBottom: 20,
  },
  footerTab:{
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  subheading: {
    width: 125,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textBox:{
    borderBottomColor: 'black',
    color: '#431d69',
    fontSize: 16,
  },
  container:{
    alignItems: 'center',
  },
  container2: {
    margin: 10,
    width: 250,
    flexDirection: 'row', 
  },
});