import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import CourseListItem from '../components/CourseListItem'
import { auth } from '../firebase'

const StudentHomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${auth.currentUser.displayName}`,
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity
            onPress={signOutUser}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 20
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons name="assignment" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  })

  return (
    <SafeAreaView>
      <ScrollView style={StyleSheet.container}>
        <CourseListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default StudentHomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
})
