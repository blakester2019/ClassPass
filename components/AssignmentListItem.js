import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, RefreshControlBase } from 'react-native'
import { ListItem } from 'react-native-elements'

const AssignmentListItem = ({ id, data }) => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <ListItem containerStyle={styles.container} key={id} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            <Text style={styles.title}>{data.name}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={styles.subtitle}>{data.dueDate}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  )
}

export default AssignmentListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: 300,
    marginBottom: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
})
