import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const EditCourseScreen = ({ route }) => {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  )
}

export default EditCourseScreen

const styles = StyleSheet.create({})
