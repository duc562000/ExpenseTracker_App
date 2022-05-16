/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpenseTracker from './screens/ExpenseTracker';


const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  colors :{
    ...DefaultTheme.colors,
    border:'transparent'
  }
}

const App = () => {
  return (
    <NavigationContainer
      theme={theme}
    >
      <Stack.Navigator
        initialRouteName='ExpenseTracker'
        screenOptions={{
          headerShown:false
        }}
      >
        <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
