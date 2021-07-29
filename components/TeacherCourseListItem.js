import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const TeacherCourseListItem = ({ id, data, editCourse }) => {

  // Generate icon to show
  const selectIcon = (subject) => {
    if (subject == "math") {
      return <MaterialCommunityIcons name="math-compass" size={24} color="#CC37C2" />
    } else if (subject == "science") {
      return <MaterialIcons name="science" size={24} color="#CC37C2" />
    } else if (subject == "history") {
      return <MaterialIcons name="history-edu" size={24} color="#CC37C2" />
    } else if (subject == "english") {
      return <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#CC37C2" />
    } else {
      return <MaterialIcons name="miscellaneous-services" size={24} color="#CC37C2" />
    }
  }

  return (
    <ListItem onPress={() => editCourse(id, data)} key={id} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>
          {selectIcon(data.subject)}
          <Text style={styles.title}>{data.name}</Text>
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )
}

export default TeacherCourseListItem

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginLeft: 20
  },
})
