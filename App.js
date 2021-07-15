import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import StudentHomeScreen from './screens/StudentHomeScreen'
import TeacherHomeScreen from './screens/TeacherHomeScreen'
import AddCourseScreen from './screens/AddCourseScreen'

const Stack = createStackNavigator()

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#CC37C2" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white"
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
        <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} />
        <Stack.Screen name="AddCourse" component={AddCourseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
