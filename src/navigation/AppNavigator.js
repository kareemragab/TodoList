import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from './../screens/#1 HomeScreen/HomeScreen';
import AddTodo from './../screens/#2 AddTodo/AddTodo';

export default Routes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => {},
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          header: () => {},
          headerStyle: {
            height: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
