import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, TouchableOpacity, Picker, Alert} from 'react-native';
import { Container, Content, Form, Header, Left, Right, Icon, Label, Input, DatePicker } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { AddSubscriptionApp } from '../services/DataService';
import { Actions } from 'react-native-router-flux';


export default class AddSubscriptions extends Component {

  constructor(props) {
    super(props);
    this.state = {
        subsAppName: null,
        amount: 0,
        renewalPeriod: '',
        paymentMethod: '',
        reminder: '',
        isVisible: false,
        date: new Date(),
        mode: 'date',
        show: false,
        fontsLoaded: false,
    };

    this.setDate = this.setDate.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
        'Simplifica': require('../assets/fonts/Simplifica/SIMPLIFICA.ttf'),      
    });

    this.setState({ fontsLoaded: true });
  }

  setSubsAppName = (value) =>{
    this.setState({ subsAppName: value });
  }
  setAmount = (value) =>{
    this.setState({ amount: value });
  }
  selectRenewalPeriod = (value) => {
    this.setState({ renewalPeriod: value });
  }
  selectPaymentMethod = (value) => {
    this.setState({ paymentMethod: value });
  }
  selectReminder = (value) => {
    this.setState({ reminder: value });
  }

  setDate(newdate) {
    this.setState({ date: newdate });
  }
  
  saveForm = () => {
    if(this.state.subsAppName && this.state.amount && this.state.renewalPeriod && this.state.paymentMethod && this.state.reminder && this.state.date){
      AddSubscriptionApp(this.state.subsAppName, this.state.amount, this.state.renewalPeriod, this.state.paymentMethod, this.state.reminder, this.state.date);
    } 
    else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  render() {
    const {date, show, mode, fontsLoaded} = this.state;

    if(fontsLoaded) {
      return (
        <Container>    
            <Header  style={[styles.header, styles.androidHeader]} 
                     iosBarStyle={"light-content"} 
                     androidStatusBarColor='#000'>

                <Left style={{flexDirection: 'row', paddingBottom: 20}}>
                     <Icon name='arrow-back' 
                           style={{color: 'black', marginLeft: 10}}
                           onPress={() => {Actions.Tab1();}}
                     />
                 </Left >

                <Right style={styles.right}>
                    <TouchableOpacity onPress={() => {Actions.LoginScreen();}}>
                      <Text>Log Out</Text>
                    </TouchableOpacity>
                </Right>

            </Header>
          <Content padder>
        
                <View style={styles.titleView}>
                  <Text style={styles.title}>ADD NEW SUBSCRIPTION</Text>
                </View>

                <View style={{paddingHorizontal: 20}}>
                  <Form>
                 
                    <View style={{marginBottom:25}}> 
                        <Label style={styles.label}>Name</Label>
                        <Input style={styles.inputBox}
                               placeholder='App name: Netflix'
                               placeholderTextColor='#b9bbc4' 
                               onChangeText={this.setSubsAppName} />
                    </View>

                    <View style={{marginBottom:25}}>
                        <Label style={styles.label}>Amount</Label>
                          <View style={styles.desc}>
                            <Text style={styles.descText}>MYR</Text>
                            <Input  style={styles.inputBox}
                                    placeholder='00.00'
                                    placeholderTextColor='#b9bbc4'
                                    onChangeText={this.setAmount} />
                          </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        <Label style={styles.label}>First Payment</Label>
                        <View>
                        <View style={styles.picker}>
                          <DatePicker 
                               defaultDate={new Date()}
                               modalTransparent={false}
                               placeHolderText="Select date"
                               animationType={"fade"}
                               mode='datetime'
                               is24Hour={false}
                               onDateChange={this.setDate}
                          />
                          </View>

                          <Text style={{color:'green'}}>
                              Date: {this.state.date.toString().substr(4, 12)}
                          </Text> 
                        </View>
                        
                    </View>

                    <View style={{marginBottom:25}}>
                        <Label style={styles.label}>Renewal</Label>
                        <View style={styles.desc}>
                          <Text style={styles.descText}>Every</Text>

                          <View style={[styles.picker, {width: '50%'}]}>
                            <Picker 
                              mode='dropdown' 
                              iosIcon={<Icon name='arrow-down' />}
                              placeholderStyle={{ color: '#bfc6ea', }}
                              placeholderIconColor='#007aff'
                              selectedValue={this.state.renewalPeriod}
                              onValueChange={this.selectRenewalPeriod}
                              Title="RenewalPeriod">
                              <Picker.Item label='Month' value='Month' />
                              <Picker.Item label='Week' value='Week' />
                              <Picker.Item label='Year' value='Year' />
                            </Picker>
                          </View>
                        </View>
                    </View>

                    <View style={{marginBottom:25}}>
                        <Label style={styles.label}>Payment Method</Label>
                          <View style={styles.picker}>
                            <Picker 
                              mode='dropdown' 
                              iosIcon={<Icon name='arrow-down' />}
                              placeholderStyle={{ color: '#bfc6ea'}}
                              textStyle={{fontSize: 13}}
                              placeholderIconColor='#007aff'
                              selectedValue={this.state.paymentMethod}
                              onValueChange={this.selectPaymentMethod}
                              Title="Method">
                              <Picker.Item label='Credit card' value='CreditCard' />
                              <Picker.Item label='Online banking' value='OnlineBanking' />
                              <Picker.Item label='Cash' value='Cash' />
                            </Picker>
                          </View>
                  
                    </View>

                    <View style={{marginBottom:20}}>
                        <Label style={styles.label}>Reminder</Label>
                        <View style={[styles.desc, {flexDirection: 'row'}]}>
                          
                          <View style={[styles.picker, {width: '60%'}]}>
                            <Picker 
                              mode='dropdown' 
                              iosIcon={<Icon name='arrow-down' />}
                              placeholderStyle={{ color: '#bfc6ea', }}
                              placeholderIconColor='#007aff'
                              selectedValue={this.state.reminder}
                              onValueChange={this.selectReminder}
                              Title="Reminder">
                                <Picker.Item label="1 day before" value="oneDayBefore" />
                                <Picker.Item label="2 day before" value="2DayBefore" />
                                <Picker.Item label="3 day before" value="3DayBefore" /> 
                                <Picker.Item label="1 week before" value="oneWeekBefore" />
                                <Picker.Item label="1 month before" value="oneMonthBefore" />
                            </Picker>
                          </View>
                        </View>
                    </View>
    
                  </Form>
                </View>
                
                <View style={styles.btnView}>
                  <TouchableOpacity style= {styles.button}
                                    onPress={() => {Actions.Tab1();}}>
                    <Text style= {{color: 'white'}}>CANCEL</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style= {styles.button} 
                                    onPress={this.saveForm} title='save'>
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
  inputBox: {
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    height: 35,
    borderColor: 'gray',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  picker: { 
    width: '100%', 
    borderWidth: 1, 
    borderRadius: 8,
    borderColor: 'gray',
    height: 35, 
    overflow: 'hidden',
    //paddingTop: -40,
   // alignItems: "center"
  },
  desc: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  descText: {
    marginRight: 10, 
    fontWeight: 'bold'
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

