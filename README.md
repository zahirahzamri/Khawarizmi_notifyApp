# Group name: Khawarizmi :smile:
### 1. Name and Matric numbers of members
    
Name         | Matric number
------------ | -------------
Nur Zahirah binti Zamri | 1718036
Nur Izyan binti Rosli | 1718844
Nur'ain Afiqah binti Mohd Shabul Fadilah | 1712282
Nurul Handani binti Nasaruddin | 1713598

### 2. Title of the project: Subcription alert App
### 3. Introduction
  <p>Today, there are many apps that can be used particularly for entertainment like Spotify and Netflix. Not every application is free to use for users though. Spotify, for example, has two versions that are free for users: Spotify Premium and Spotify. Users need to have subscriptions and must be charged to use Spotify Premium. There are many things the human brain cannot remember. Using this mobile application can prevent the cognitive load from occurring. This mobile app is capable of tracking payment and utility service bills that were saved in the database system.</p>
  
  <p>This app works to keep users aware of their payments and utility bills. Firstly, users need to register or sign in to the system. The system then has three user options to use; Add, View, and Update.</p>
  
  <p>There are two separate data categories in this mobile application that can be applied to the system; subscription services and utilities. The aim of categorizing this is to view the data on the View page later. It allows the entry of what users bring into the system.</p>
  
### 4. Objectives
   * To notify and keep track of the bills that users have to pay when the deadline arrives.
   * To allow users to remember the payments they need to make in their everyday lives.

    
### 5. Features and functionalities of the proposed mobile application.
 Features & Functionalities | Explanation
 ---------------------------| -----------------------------------
 Expo                       | Use non-native code for mobile application development.
 React-native -router flux  | Use RNRF for routing.
 Native base                | UI toolkit for styling.
 Firebase                   | Real-time database to synchronize live data between mobile application with user authentication.
 DateTimePicker API         | Provide access to the user for time and date selection when inserting new subscription information.
 Notifications API          | Allow the mobile app to push notification and notify the user when the payment deadline arrives.
 Signup page                | Allow new user to register themselves before they can use the mobile app.
 Login page                 | Enable registered user to login into their account to become an authorized user.
 List page                  | Display a list of subscribed apps or utilities.
 Add page                   | Allow users to enter new subscription or utility information by providing the name, date, notes and preferable push notification time.
 Update page                | Users can edit existing data or delete any subscription item that they no longer needed.
 View page                  | User can view the details of every item entered into the database.
  
### 6. Screen navigation (routing) and components (presentational and container) implementation with a diagram
  ###### Navigation Diagram
  
  ![Routing Diagram-Khawarizmi](https://github.com/zahirahzamri/Khawarizmi_notifyApp/blob/master/images/routing.jpg)
  
  Flow | Screen Navigation
  -----|-----------------------------------------------------------------------------------
  1    | Renavigate between **Sign Up page** and **Sign In page** by 'Sign In' and 'Sign Up'
  2    | Renavigate between **Sign In page** and **List page** by 'Login' and 'Logout'
  3    | Renavigate between **List page** and **Add page** by '<' button or 'Cancel' and '+' button
  4    | Renavigate between **List page** and **View page by** '<' button and '>' button
  5    | Navigate from **Update page** to **List page** by 'Delete'
  6    | Navigate from **Add page** to **View page** by 'Save'
  7    | Renavigate between **View page** and **Update page** by 'Edit' and '<' button
  8    | Navigate from **Add page** to **Sign In page** by 'Log Out'
  9    | Navigate from **View page** to **Sign In page** by 'Log Out'
  10   | Navigate from **Update page** to **Sign In page** by 'Log Out'
  
  
  Presentational Component   | Explanation
  ---------------------------|---------------------------------------------------------------------------------------------------------------------
  View                       | To display the components used
  TextInput                  | To key-in user's details in login/sign up page & the data in the "Others" option in each category in the "Add" page
  Button /TouchableHighlight | To select the given options in "Add" page & click the login or sign up button 
  Text                       | To name the title of every page for users' guide and understanding
  FlatList                   | To display the list of the items in the database on the "View" page
  
  
 Container Component         | Explanation
 ----------------------------|---------------------------------------------------------------------------------------------------------------------
 onPress                     | Click the button and proceed to the next page & click the given options in the category section for adding the items to the database
 onChangeText                | Use in TextInput components

  
  
### 7. Sequence diagram of the proposed mobile application.
 ![Sequence Diagram-Khawarizmi](https://github.com/zahirahzamri/Khawarizmi_notifyApp/blob/master/images/sequence%20diagram.png)
  
### 8. References
  * API Reference. (n.d.). Retrieved July 19, 2020, from https://docs.expo.io/versions/latest/
  * Core Components and APIs · React Native. (n.d.). Retrieved July 20, 2020, from https://reactnative.dev/docs/components-and-apis
