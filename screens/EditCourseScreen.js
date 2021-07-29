import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { db } from '../firebase'

const EditCourseScreen = ({ navigation, route }) => {
  const [student, setStudent] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.data.name,
      headerBackTitle: ""
    })
  }, [])

  // Enrolls student in a course given
  // the id from findStudentID()
  const enrollStudent = (studentID) => {
    db.collection("users")
      .doc(studentID)
      .collection("courses")
      .doc(route.params.id)
      .set({
        courseID: route.params.id,
        name: route.params.data.name,
        subject: route.params.data.subject
      })
    navigation.replace("TeacherHome")
  }

  // Query to find student ID in users collection
  // ID is then passed to enrollStudent(studentID)
  const findStudentID = () => {
    db.collection("users")
      .where("email", "==", student)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().isTeacher === "no") {
            enrollStudent(doc.id)
          }
          else {
            alert("Cannot add a teacher to a course")
          }
        })
      })
      .catch((error) => alert(error))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text h3>Enroll a Student</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Student E-mail"
          value={student}
          onChangeText={(text) => setStudent(text)}
        />
      </View>
      <Button
        onPress={findStudentID}
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyle}
        title="Enroll Student"
      />
      <Text h3>Add an Assignment</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Assignment Name"
        />
        <Input
          placeholder="Points Possible"
        />
        <Input
          placeholder="Due Date"
        />
      </View>
      <Text h3>Assignments</Text>
    </SafeAreaView>
  )
}

export default EditCourseScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: 300,
  },
  buttonDimensions: {
    width: 200,
    marginTop: 20,
    marginBottom: 50
  },
  buttonStyle: {
    backgroundColor: "#CC37C2"
  }
})
