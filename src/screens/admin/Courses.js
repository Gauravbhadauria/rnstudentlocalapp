import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {db, getCourses} from '../../db/Database';

const Courses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getCourses(result => {
      console.log('response', result);
      setCourses(result);
    });
  }, [isFocused]);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.courseItem}>
        <Text style={styles.courseName}>{item.name}</Text>
        <Text style={styles.fees}>{'INR ' + item.fees}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={renderItem} />
      <TouchableOpacity
        style={styles.addCourseBtn}
        onPress={() => {
          navigation.navigate('AddCourse');
        }}>
        <Text style={styles.btnTxt}>+ Add Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Courses;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  courseName: {
    fontSize: 30,
    fontWeight: '600',
  },
  fees: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  courseItem: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 20,
  },
  addCourseBtn: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 30,
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
  },
});
