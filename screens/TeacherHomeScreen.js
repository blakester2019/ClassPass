import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons'
import TeacherCourseListItem from '../components/TeacherCourseListItem'
import { auth } from '../firebase'

const TeacherHomeScreen = ({ navigation }) => {

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login")
    })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: auth.currentUser.displayName,
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
          <TouchableOpacity onPress={() => navigation.navigate("AddCourse")} activeOpacity={0.5}>
            <Ionicons name="md-add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  })

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text h3>Manage Courses</Text>
      </View>
      <ScrollView style={StyleSheet.container}>

      </ScrollView>
    </SafeAreaView>
  )
}

export default TeacherHomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  titleContainer: {
    backgroundColor: "white",
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#CC37C2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})
