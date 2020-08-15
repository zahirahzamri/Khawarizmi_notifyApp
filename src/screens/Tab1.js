import React, { Component } from 'react';
import { SafeAreaView} from 'react-native';
import { Content, Text, List, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import AppNameList from '../components/AppNameList';

let appsRef = db.ref('/apps');

export default class AppListScreen extends Component {
  constructor(){
    super();
    this.state = {
      apps: [],
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
  }

  render() {
    return (
        
        <SafeAreaView> 
          <Content padder>

                <List vertical={true}>
                  <AppNameList apps={this.state.apps} 
                      onPress={(subsAppName) => {Actions.UpdateSubscription({subsAppName: subsAppName});}}  
                  />
                </List>
                
                <Text>{this.props.subsAppName}</Text>  
            </Content>
        </SafeAreaView>  

    );

  }
}