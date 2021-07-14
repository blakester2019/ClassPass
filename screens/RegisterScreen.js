import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth, db } from '../firebase'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // teacher determines if the user will have the
  // ability to create classes
  const [teacher, setTeacher] = useState("")

  const register = () => {
    if (teacher.toLowerCase() === "yes" || teacher.toLowerCase() === "no") {
      auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
          })
          db.collection("users").add({
            name: name,
            email: email,
            isTeacher: teacher,
            userID: auth.currentUser.uid
          })
        })
        .catch(error => alert(error))
    } else {
      alert("Only 'yes' or 'no' is an acceptable answer")
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create ClassPass Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="First and Last Name"
          autofocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          label="Are you a teacher?"
          placeholder="Type yes or no"
          type="text"
          value={teacher}
          onChangeText={(text) => setTeacher(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyle}
        raised
        title="Register"
        onPress={register}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    backgroundColor: "white"
  },
  buttonDimensions: {
    width: 200,
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: "#CC37C2",
  },
  inputContainer: {
    width: 300,
  },
})
