import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RenderListComponent from '../component/RenderListComponent';

export default function ToDoScreenUI(props) {
  const buttons = [
    {type: 'Edit', style: {backgroundColor: '#8576FF', color: 'black'}},
    {type: 'Done', style: {backgroundColor: '#90D26D', color: 'black'}},
    {type: 'Delete', style: {backgroundColor: 'red', color: 'black'}},
  ];
  const data = props.data;

  const {val, setVal} = props?.states;

  const add = params => {
    const addFunc = props?.allFunctions.add;
    const title = 'Hello This is add';
    addFunc({title});
  };

  const handleChange = text => {
    if (text.length > 149) {
      Alert.alert('Please Keep Description of Task Short and Simple');
    } else {
      setVal(text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Task</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Your Task To Do"
          style={styles.inputStyle}
          maxLength={150}
          value={val}
          onChangeText={text => handleChange(text)}
          multiline
        />
        <TouchableOpacity
          style={styles.inputButton}
          activeOpacity={0.7}
          onPress={() => add()}>
          <Text style={styles.inputAddButtonText}>ADD TASK</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activeTaskContainer}>
        <Text style={styles.activeTaskHeader}>
          Active Tasks : <Text style={{color: '#74E291'}}>{data?.length}</Text>
        </Text>
        <RenderListComponent
          {...props}
          data={data}
          buttons={buttons}
          allFunctions={props.allFunctions}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // height: 43,
    borderRadius: 5,
    backgroundColor: '#FEFAF6',
    color: 'black',
    fontSize: 15,
    flex: 0.97,
  },
  inputButton: {
    backgroundColor: '#3FC1C9',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    alignSelf: 'flex-end',
    paddingHorizontal: 7,
  },
  inputAddButtonText: {
    alignItems: 'center',
    fontWeight: '700',
    color: '#453F78',
  },
  activeTaskContainer: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
  },
  activeTaskHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 5,
    borderTopWidth: 1,
    paddingTop: 10,
  },
});
