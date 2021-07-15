import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { db } from '../firebase'

const TeacherCourseListItem = ({ id, data }) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{}}>
          {data.name}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )
}

export default TeacherCourseListItem

const styles = StyleSheet.create({})
