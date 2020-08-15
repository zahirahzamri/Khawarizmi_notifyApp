import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ListScreen from './src/screens/ListScreen';
import Tab1 from './src/screens/Tab1';
import AddSubscriptions from './src/screens/AddSubscriptions';
import ViewSubscription from './src/screens/ViewSubscription';
import UpdateSubscription from './src/screens/UpdateSubscription';
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import AddUtilities from './src/screens/AddUtilities';


export default class App extends Component {
  render() {
    return (
      <Router headerMode = 'none'>
        <Scene key="root">
          <Scene key="LoginScreen" component={LoginScreen} left={()=>null} title="Notify_U"  />
          <Scene key="SignupScreen" component={SignupScreen} left={()=>null} title="Mureed" />
          
          <Scene key="MainScreen" component={MainScreen} left={()=>null} title="Notify_U" initial={true}/>
          <Scene key="ListScreen" component={ListScreen} left={()=>null} title="Notify_U" />
          <Scene key="Tab1" component={Tab1} left={()=>null} title="Notify_U" />
          
          
          <Scene key="AddSubscriptions" component={AddSubscriptions} left={()=>null} title="Notify_U" />
          <Scene key="ViewSubscription" component={ViewSubscription} left={()=>null} title="Notify_U"/>
          <Scene key="UpdateSubscription" component={UpdateSubscription} left={()=>null} title="Notify_U"/>
        </Scene>
      </Router>
    )
  }
}
