import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { auth } from '../firebase'

const HomeScreen = ({ navigation }) => {

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  return (
    <View>
      <Text>Welcome, {auth.currentUser.displayName}</Text>
      <Button
        onPress={signOutUser}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
