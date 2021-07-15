import { NavigationContainer } from '@react-navigation/native'
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'
import { db, auth } from "../firebase"
import firebase from 'firebase'
import { StatusBar } from 'expo-status-bar'
import uuid from 'react-native-uuid'

const AddCourseScreen = ({ navigation }) => {
  const [courseName, setCourseName] = useState("")
  const [courseSubject, setCourseSubject] = useState("")

  const createCourse = () => {
    if (
      courseSubject.toLowerCase() === "math" ||
      courseSubject.toLowerCase() === "science" ||
      courseSubject.toLowerCase() === "history" ||
      courseSubject.toLowerCase() === "english" ||
      courseSubject.toLowerCase() === "other") {
      // add course to database
      const createdID = uuid.v1()
      db.collection("courses").doc(createdID).set({
        name: courseName,
        subject: courseSubject.toLowerCase(),
        teacher: auth.currentUser.displayName,
        teacherID: auth.currentUser.uid,
      })
      // add course to teachers account
      db.collection("users").doc(auth.currentUser.uid).collection("courses").doc(createdID).set({
        name: courseName,
        courseID: createdID
      })
      // navigate back to the teachers home screen
      // after successful submit
      navigation.replace("TeacherHome")
    } else {
      alert("Error, not a valid subject")
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Course"
    })
  }, [])

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ color: "#CC37C2", paddingBottom: 10 }}>Create a New Course</Text>
      <Text style={{ fontSize: 16 }}>
        Choose a name and subject for your new course.
      </Text>
      <Text style={{ fontSize: 16, paddingBottom: 30 }}>
        The only acceptable subjects are: math, science, history, english, or other
      </Text>
      <View style={styles.inputContainer}>
        <Input
          autofocus
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChangeText={(text) => setCourseName(text)}
          rightIcon={
            <FontAwesome name="pencil" size={24} color="black" />
          }
        />
        <Input
          type="text"
          placeholder="Course Subject"
          value={courseSubject}
          onChangeText={(text) => setCourseSubject(text)}
          onSubmitEditing={createCourse}
          rightIcon={
            <FontAwesome name="folder" size={24} color="black" />
          }
        />
      </View>
      <Button onPress={createCourse} containerStyle={styles.buttonDimensions} buttonStyle={styles.buttonStyle} title="Submit" />
    </KeyboardAvoidingView>
  )
}

export default AddCourseScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white"
  },
  inputContainer: {
    width: 300,
    paddingBottom: 30,
  },
  buttonDimensions: {
    width: 200
  },
  buttonStyle: {
    backgroundColor: "#CC37C2"
  }
})
