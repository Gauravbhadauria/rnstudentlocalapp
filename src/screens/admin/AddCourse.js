import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {insertCourse, updateCourse} from '../../db/Database';
import {useNavigation, useRoute} from '@react-navigation/native';

const AddCourse = () => {
  const route = useRoute();
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params.type == 'edit') {
      navigation.setOptions({title: 'Update Course'});
    }
  }, [route.params.type]);
  console.log(route.params);
  const [name, setName] = useState(
    route.params.type == 'edit' ? route.params.data.name : '',
  );
  const [fees, setFees] = useState(
    route.params.type == 'edit' ? route.params.data.fees + '' : '',
  );
  const [message, setMessage] = useState({type: '', msg: ''});
  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Course Name"
        style={styles.input}
      />
      <TextInput
        value={fees}
        onChangeText={setFees}
        placeholder="Enter Fees"
        style={styles.input}
      />
      {message.msg != '' && (
        <Text
          style={[
            {
              color: message.type == 'error' ? 'red' : 'green',
            },
            styles.messageStyle,
          ]}>
          {message.msg}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (route.params.type == 'new') {
            insertCourse(
              name,
              parseInt(fees),
              res => {
                console.log('res', res);
                setName('');
                setFees('');
                setMessage({
                  type: 'success',
                  msg: 'course added successfully!',
                });
              },
              err => {
                setMessage({type: 'error', msg: err});
                console.log('error', err);
              },
            );
          } else {
            updateCourse(
              route.params.data.id,
              name,
              parseInt(fees),
              res => {
                setMessage({
                  type: 'success',
                  msg: 'course updated successfully',
                });
              },
              err => {
                setMessage({
                  type: 'error',
                  msg: err,
                });
              },
            );
          }
        }}
        style={styles.submitBtn}>
        <Text style={styles.btnTxt}>
          {route.params.type == 'edit' ? 'Update Cpurse' : 'Submit Course'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCourse;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageStyle: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingLeft: 20,
    color: 'black',
    marginTop: 20,
  },
  submitBtn: {
    width: '90%',
    height: 50,
    marginTop: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    color: 'white',
  },
});
