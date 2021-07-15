import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image, withTheme } from 'react-native-elements'
import firebase from 'firebase'
import { auth, db } from '../firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const docRef = db.collection("users").doc(auth.currentUser.uid);
        docRef.get().then((doc) => {
          if (doc.data().isTeacher === "yes") {
            navigation.replace('TeacherHome')
          } else {
            navigation.replace('StudentHome')
          }
        })
          .catch((error) => alert(error))
      }
    })

    return unsubscribe
  }, [])

  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error))
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        source={
          require("../assets/ClassPassLogo.png")
        }
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          inputStyle={styles.input}
          inputContainerStyle={styles.placeholderStyles}
          placeholder="Email"
          autofocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          inputStyle={styles.input}
          inputContainerStyle={styles.placeholderStyles}
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyleLogin}
        title="Login"
        onPress={signIn}
      />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.buttonDimensions}
        buttonStyle={styles.buttonStyleRegister}
        titleStyle={styles.buttonTitle}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#262525"
  },
  inputContainer: {
    width: 300,
  },
  input: {
    color: "white"
  },
  placeholderStyles: {
    borderColor: "white",
  },
  buttonDimensions: {
    width: 200,
    marginTop: 10,
  },
  buttonStyleLogin: {
    backgroundColor: "#CC37C2",
    borderColor: "#CC37C2",
  },
  buttonStyleRegister: {
    borderColor: "#CC37C2",
  },
  buttonTitle: {
    color: "white",
  },
})
