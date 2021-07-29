import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import AssignmentListItem from '../components/AssignmentListItem'
import { db } from '../firebase'
import uuid from 'react-native-uuid'

const EditCourseScreen = ({ navigation, route }) => {
  // State to enroll a student
  const [student, setStudent] = useState("")
  // States to create an assignment
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [points, setPoints] = useState("")
  const [due, setDue] = useState("")
  // State to show all assignments
  const [courseAssignments, setCourseAssignments] = useState([])

  // Set Navigation Options
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.data.name,
      headerBackTitle: "",
      cardStyle: { backgroundColor: "#fff" }
    })
  }, [])

  // Load Assignments
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("courses")
      .doc(route.params.id)
      .collection("assignments")
      .onSnapshot((snapshot) => setCourseAssignments(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ))

    return unsubscribe
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

    // Navigate back to home screen
    navigation.replace("TeacherHome")
  }

  // Query to find student ID in users collection
  const findStudentID = () => {
    db.collection("users")
      .where("email", "==", student)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().isTeacher === "no") {
            // Funtion call once ID is found
            enrollStudent(doc.id)
          }
          else {
            alert("Cannot add a teacher to a course")
          }
        })
      })
      .catch((error) => alert(error))
  }

  // Creates assignment from input fields
  const createAssignment = () => {

    // check for empty fields
    if (name === "" || desc === "" || points === "" || due === "") {
      alert("Looks like you have an empty field")
      return
    }

    // Generate Random ID for assignment
    const createdID = uuid.v1()

    // Add assignment to the course
    db.collection("courses").doc(route.params.id).collection("assignments")
      .doc(createdID)
      .set({
        name: name,
        description: desc,
        pointsPossible: points,
        dueDate: due
      })

    // Navigate back to home screen
    navigation.replace("TeacherHome")
  }

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text h3>Enroll a Student</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Student E-mail"
            value={student}
            onChangeText={(text) => setStudent(text)}
            onSubmitEditing={findStudentID}
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
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder="Description"
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
          <Input
            placeholder="Points Possible"
            value={points}
            onChangeText={(text) => {
              if (text !== "" && text !== null) {
                setPoints(parseInt(text))
              }
              else {
                setPoints(0)
              }
            }}
          />
          <Input
            placeholder="Due Date"
            value={due}
            onChangeText={(text) => setDue(text)}
            onSubmitEditing={createAssignment}
          />
        </View>
        <Button
          onPress={createAssignment}
          containerStyle={styles.buttonDimensions}
          buttonStyle={styles.buttonStyle}
          title="Create Assignment"
        />
        <Text h3>Assignments</Text>
      </View>
      <View style={styles.assignmentContainer}>
        {courseAssignments.map(({ id, data }) => (
          <AssignmentListItem key={id} id={id} data={data} />
        ))}
      </View>
    </SafeAreaView>
  )
}

export default EditCourseScreen

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 100
  },
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
  },
  assignmentContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center"
  }
})
