import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity}  from 'react-native';
import { Container, Content, Form, Header, Left, Right, Icon, Input, Picker, Label} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import { db } from '../config/db';
import { updateUtilities } from '../services/DataService';
import { removeUtilities } from '../services/DataService';

let subscriptionRef = db.ref('/apps');

export default class UpdateUtilities extends Component {

  constructor() {
    super();
    this.state = {
      apps:[],
      utilitiesName: null,
      paymentMethod: null,
      duePeriod: null,
      reminder: null,
      date: new Date(),
      mode: 'date',
      show: false,
      fontsLoaded: false,      
    };
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
                  utilitiesName: element.utilitiesName,
                  paymentMethod: element.paymentMethod,
                  duePeriod: element.duePeriod,
                  reminder: element.reminder,
                  date: element.date
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

  setutilitiesName = (value) =>{
    this.setState({ utilitiesName: value });
  }
  selectPaymentMethod = (value) => {
    this.setState({ paymentMethod: value });
  }
  selectduePeriod = (value) => {
    this.setState({ duePeriod: value });
  }
  selectReminder = (value) => {
    this.setState({ reminder: value });
  }
  show = (mode) => {
    this.setState({
      show: true,
      mode,
    })
  }
  datepicker = (value) => {
      this.show(value);
  }
  timepicker = (value) => {
    this.show(value)
  }

  updateData = () =>{
    if(this.state.utilitiesName && this.state.duePeriod && this.state.paymentMethod && this.state.reminder){
      updateUtilities(this.state.utilitiesName, this.state.duePeriod, this.state.paymentMethod, this.state.reminder);
    } 
    else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  deleteData = (utilitiesName) =>{
    this.props.onPress(removeUtilities(utilitiesName));
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
                     <Icon name='arrow-back' onPress={() => {Actions.UtilitiesListScreen();}}
                           style={{color: 'black', marginLeft: 10}}
                     />
                 </Left >

                <Right style={styles.right}>
                  <TouchableOpacity onPress={() => {Actions.LoginScreen();}}><Text>Log Out</Text></TouchableOpacity>
                </Right>

            </Header>
          <Content padder>
                <View style={styles.titleView}>
                  <Text style={styles.title}>UPDATE UTILITIES</Text>
                </View>
                <Form>
                  <View style={styles.container2}>
                      <Text style={styles.subheading}>Name</Text>
                        <Input style={styles.inputBox} onChangeText={this.setutilitiesName} value={this.props.utilitiesName} disabled='true'/>
                  </View>
                  <View style={styles.container2}>
                      <Text style={styles.subheading}>Renewal Period</Text>
                      <Picker 
                        mode="dropdown" 
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputBox}
                        placeholder="Select Due Period"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.duePeriod}
                        onValueChange={this.selectduePeriod}
                        Title="duePeriod"
                        >
                        <Picker.Item label='Month' value='Month' />
                        <Picker.Item label='Week' value='Week' />
                        <Picker.Item label='Year' value='Year' />
                      </Picker>
                  </View>
                  <View style={styles.container2}>
                      <Text style={styles.subheading}>Payment method</Text>
                      <Picker 
                        mode="dropdown" 
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputBox} 
                        placeholder="Select Payment"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.paymentMethod}
                        onValueChange={this.selectPaymentMethod}
                        Title="PaymentMethod"
                        >
                        <Picker.Item label="Credit Card" value="Credit card" />
                        <Picker.Item label="Online Banking" value="Online Banking" />
                        <Picker.Item label="Cash" value="Cash" />
                      </Picker>
                  </View>
                  <View style={styles.container2}>
                      <Text style={styles.subheading}>Reminder</Text>
                      <Picker 
                        mode="dropdown" 
                        iosIcon={<Icon name="arrow-down" />}
                        style={styles.inputBox} 
                        placeholder="Select Reminder"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.reminder}
                        onValueChange={this.selectReminder}
                        Title="Reminder"
                        >
                        <Picker.Item label="1 day before" value="oneDayBefore" />
                        <Picker.Item label="2 day before" value="2DayBefore" />
                        <Picker.Item label="3 day before" value="3DayBefore" />
                        <Picker.Item label="1 week before" value="oneWeekBefore" />
                      </Picker>
                  </View>
                  <View style={styles.container2}>
                        <Label style={styles.label}>First Payment</Label>
                        <View>
                          <TouchableOpacity onPress={this.datepicker}
                                            style={[styles.inputBox, {paddingTop: 5}]}> 
                            <Text>Select date</Text>
                          </TouchableOpacity>
                          {
                            show && <DateTimePicker value={date}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={this.setDate}>

                            </DateTimePicker > 
                          }

                          <Text style={{color:'green'}}>
                              Date: {this.state.date.toString().substr(4, 12)}
                          </Text> 
                        </View>
                  </View>
                </Form>

                <View style={styles.btnView}>
                  <TouchableOpacity style= {styles.button} onPress={() => {Actions.deleteData;}}>
                    <Text style= {{color: 'white'}}>DELETE</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style= {styles.button} onPress={() => {Actions.updateData;}}>
                    <Text style= {{color: 'white'}}>SAVE</Text>
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
  label: {
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#431d69'
  },
  button: {
    width: 145,
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
    paddingHorizontal: 20,
  },
  inputBox: {
    borderBottomColor: 'black',
    color: '#431d69',
    fontSize: 14,
    width: 200,
  },
  subheading: {
    width: 150,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container2: {
    width: 250,
    alignItems: 'center',
    flexDirection: 'row', 
    justifyContent:'space-between', 
  }
});