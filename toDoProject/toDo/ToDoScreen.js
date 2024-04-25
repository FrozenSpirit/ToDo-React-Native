import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Icons from '../../../assets/icons/Icon';
import ToDoScreenUI from './ToDoScreenUI';
import TaskCompletedScreen from './TaskCompletedScreen';
import Header from '../../../common/components/header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Strings from '../../../utils/constants/Strings';

export default function ToDoScreen() {
  const [completedVisible, setCompletedVisible] = useState(true);
  const [val, setVal] = useState('');
  const [doneList, setDoneList] = useState([]);
  const [data, setData] = useState([]);

  const states = {val, setVal};

  useEffect(() => {
    getActiveTasksAsync();
    getDoneTasksAsync();
  }, []);

  useEffect(() => {
    setActiveTasksAsync();
  }, [data]);

  useEffect(() => {
    setDoneTasksAsync();
  }, [doneList]);

  const setActiveTasksAsync = async () => {
    console.log('setting active tasks..');
    try {
      await AsyncStorage.setItem(
        Strings.ASYNC_KEYS.activeTasks,
        JSON.stringify(data),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveTasksAsync = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(
        Strings.ASYNC_KEYS.activeTasks,
      );
      const currentUser = JSON.parse(savedUser);
      setData(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const setDoneTasksAsync = async () => {
    console.log('setting done tasks..');
    try {
      await AsyncStorage.setItem(
        Strings.ASYNC_KEYS.doneTasks,
        JSON.stringify(doneList),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDoneTasksAsync = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(
        Strings.ASYNC_KEYS.doneTasks,
      );
      const currentUser = JSON.parse(savedUser);
      setDoneList(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  function handleAdd(params) {
    if (val.trim().length > 0) {
      const mnt = moment().format('MMMM Do YYYY, h:mm:ss a');
      const newData = {id: mnt, title: val.trim()};
      setData([newData, ...data]);
      setVal('');
    } else {
      Alert.alert('Please Enter Your Task');
    }
  }

  function handleEdit(params) {
    const id = params?.id;
    const newData = data.filter(item => item.id === params?.id);

    if (val.length > 0) {
      Alert.alert('Please Commit Your Previous Edit');
    } else {
      setVal(newData[0].title);
      finallyDelete({id});
    }
  }

  function finallyDelete(params) {
    const newData = data.filter(item => item.id !== params?.id);
    setData(newData);
  }

  function handleDelete(params) {
    Alert.alert('Confirm Delete', 'This action is irreversible', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK',
        onPress: () => {
          const id = params?.id;
          finallyDelete({id});
        },
      },
    ]);
  }

  function deleteDoneTask(params) {
    const newData = doneList.filter(item => item.id !== params?.id);
    setDoneList(newData);
  }

  function handleDeleteDoneTask(params) {
    Alert.alert('Confirm Delete', 'This action is irreversible', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK',
        onPress: () => {
          const id = params?.id;
          deleteDoneTask({id});
        },
      },
    ]);
  }

  function handleAddToCompleted(params) {
    const id = params?.id;
    const done = data.filter(item => item.id === params?.id);
    setDoneList([done[0], ...doneList]);
    finallyDelete({id});
  }

  let allFunctions = {
    add: handleAdd,
    deleteFunction: handleDelete,
    editFunction: handleEdit,
    addToCompleted: handleAddToCompleted,
    deleteDoneTask: handleDeleteDoneTask,
  };

  function handlePress() {
    if (doneList?.length > 0 && completedVisible) {
      setCompletedVisible(!completedVisible);
    } else if (doneList?.length >= 0 && !completedVisible) {
      setCompletedVisible(!completedVisible);
    } else {
      Alert.alert('You have no task completed yet.');
    }
  }

  return (
    <View style={styles.container}>
      <Header title={'ToDo App'} headerStyle={{backgroundColor: '#EE4266'}} />

      {completedVisible ? (
        <ToDoScreenUI
          {...allFunctions}
          data={data}
          allFunctions={allFunctions}
          states={states}
        />
      ) : (
        <TaskCompletedScreen
          data={doneList}
          allFunctions={allFunctions}
          {...allFunctions}
        />
      )}

      <View style={{height: 70}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonWrapper}
          onPress={() => handlePress()}>
          <Text style={styles.buttonText}>
            {completedVisible ? 'Show Completed Task' : 'Show Active Task'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFBDA'},
  buttonWrapper: {
    alignSelf: 'center',
    backgroundColor: '#41B06E',
    flex: 0.6,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1.5,
  },
  buttonText: {fontWeight: '600', fontSize: 16, color: 'white'},
});

{
  /*
       <Text>
        <Icons type={'material'} name={'home'} size={30} color={'black'} />
      </Text>
  <Icons
        type={'material'}
        name={'assured-workload'}
        size={'13'}
        color={'white'}
      /> */
}
