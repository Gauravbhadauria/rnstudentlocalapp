import {View, Text, Alert} from 'react-native';
import React, {useEffect} from 'react';
import SQLite from 'react-native-sqlite-storage';
import MainNavigator from './src/navigation/MainNavigator';
import {initDB} from './src/db/Database';
const App = () => {
  useEffect(() => {
    initDB();
  }, []);
  return <MainNavigator />;
};

export default App;
