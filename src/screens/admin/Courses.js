import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {db, deleteCourse, getCourses} from '../../db/Database';

const Courses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getCourseList();
  }, [isFocused]);
  const getCourseList = () => {
    getCourses(result => {
      console.log('response', result);
      setCourses(result);
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.courseItem}>
        <View>
          <Text style={styles.courseName}>{item.name}</Text>
          <Text style={styles.fees}>{'INR ' + item.fees}</Text>
        </View>
        <View style={{gap: 20}}>
          <TouchableOpacity
            onPress={() => {
              deleteCourse(
                item.id,
                res => {
                  Alert.alert('res', JSON.stringify(res));
                  getCourseList();
                },
                err => {
                  Alert.alert('error', err);
                },
              );
            }}>
            <Image
              source={require('../../images/delete.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddCourse', {type: 'edit', data: item});
            }}>
            <Image
              source={require('../../images/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={renderItem} />
      <TouchableOpacity
        style={styles.addCourseBtn}
        onPress={() => {
          navigation.navigate('AddCourse', {type: 'new'});
        }}>
        <Text style={styles.btnTxt}>+ Add Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.addCourseBtn, {bottom: 120}]}
        onPress={() => {
          navigation.navigate('AddSubject', {type: 'new'});
        }}>
        <Text style={styles.btnTxt}>+ Add Subject</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.addCourseBtn, {bottom: 180}]}
        onPress={() => {
          navigation.navigate('Subjects');
        }}>
        <Text style={styles.btnTxt}>View Subjects</Text>
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,

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
  icon: {
    width: 24,
    height: 24,
  },
});
