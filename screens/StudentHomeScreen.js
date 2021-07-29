import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons'
import StudentCourseListItem from '../components/StudentCourseListItem'
import { auth, db } from '../firebase'

const StudentHomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([])

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
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons name="assignment" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  })

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("courses")
      .onSnapshot((snapshot) => setCourses(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ))

    return unsubscribe
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text h3>Enrolled Courses</Text>
      </View>
      <ScrollView style={StyleSheet.container}>
        {courses.map(({ id, data }) => (
          <StudentCourseListItem key={id} id={id} data={data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default StudentHomeScreen

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
