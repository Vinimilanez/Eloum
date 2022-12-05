/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { InitialState, NavigationContainer, StackActions, useNavigationContainerRef } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import DataBase, { AppDataSource } from '../infra/database';
import { Provider } from 'react-native-paper';
import { DefaultTheme } from './themes/DefaultTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './sceens/Login';
import PersonRepository from '../repository/people/PersonRepository';
import Person from '../domain/entities/people/Person';
import Home from './sceens/Home';

const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';
const Stack = createNativeStackNavigator();

const App = () => {
  
  const [loading, setLaoding] = useState<Boolean>(true);

  useEffect(() => {
    DataBase.getDataBaseConnection().then((result) => {
      console.log("Base de dados conectada com sucesso!");
    }).catch((err) => {
      console.error(err);
    });
  },[]);

  const navigationRef = useNavigationContainerRef();

  return (
    <Provider theme={DefaultTheme}>
      <SafeAreaView style={{backgroundColor: 'black', flex: 1, flexDirection:'column'}}>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor="rgba(0, 0, 0, 0.24)"
        />
        <NavigationContainer 
          ref={navigationRef}
          onStateChange={(state) =>
            AsyncStorage?.setItem(
              NAVIGATION_PERSISTENCE_KEY,
              JSON.stringify(state)
            )
          }
        >
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                header:()=>{}
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                header:()=>{}
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
