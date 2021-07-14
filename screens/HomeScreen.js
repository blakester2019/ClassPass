import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase'

const HomeScreen = () => {
  return (
    <View>
      <Text>Welcome, {auth.currentUser.displayName}</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
