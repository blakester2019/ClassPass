import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Switch } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // teacher determines if the user will have the
  // ability to create classes
  const [teacher, setTeacher] = useState("")

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
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          label="Are you a teacher?"
          placeholder="Type yes or no"
          type="password"
          value={teacher}
          onChangeText={(text) => setTeacher(text)}
        />
      </View>
      <Button
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyle}
        raised
        title="Register"
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
