import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export default function CustomButton(props) {
  const haha = props?.backgroundColor;
  //   console.log(props.allFunctions['add']);
  const propFunction = () => {
    // const add = props.allFunctions['add'];
    // const title = 'Hello from custom button';
    // add({title});
    const id = props?.id;
    // console.log(id);

    switch (props?.type) {
      case 'Edit':
        const edit = props?.editFunction;
        edit({id});
        break;
      case 'Delete':
        // const deleteFunction = props?.deleteFunction;
        // deleteFunction({id});
        props?.deleteFunction({id});
        break;
      case 'Done':
        const done = props?.addToCompleted;
        done({id});
        break;
      case 'Remove':
        const removeDoneTask = props?.deleteDoneTask;
        removeDoneTask({id});
        break;
      default:
        console.log('default');
        break;
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => propFunction()}
        activeOpacity={0.7}
        style={{
          ...styles.wrapper,
          ...props?.style,
        }}>
        <Text style={styles.buttonText}>{props?.type}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 3,
    borderWidth: 1.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
  },
});
