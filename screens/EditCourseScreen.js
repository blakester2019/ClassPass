import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Input, Button, Text } from 'react-native-elements'
import { db } from '../firebase'

const EditCourseScreen = ({ navigation, route }) => {
  const [student, setStudent] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.data.name
    })
  }, [])

  const enrollStudent = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text h3>Enroll a Student</Text>
      <Input
        placeholder="Student E-mail"
        value={student}
        onChangeText={(text) => setStudent(text)}
      />
      <Button
        onPress={enrollStudent}
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyle}
        title="Enroll Student"
      />
      <Text h3>Add an Assignment</Text>
      <Input
        placeholder="Assignment Name"
      />
      <Input
        placeholder="Points Possible"
      />
      <Input
        placeholder="Due Date"
      />
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
  }
})
