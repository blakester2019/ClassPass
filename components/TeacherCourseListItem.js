import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { db } from '../firebase'

const TeacherCourseListItem = ({ name, subject }) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{}}>
          CS-150
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )
}

export default TeacherCourseListItem

const styles = StyleSheet.create({})
