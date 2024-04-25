import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

export default function CardComponent(props) {
  const data = props?.data;
  const buttons = props?.buttons;

  return (
    <View style={{...styles.container, ...props?.cardStyle}}>
      <Text style={styles.idText}>Task ID : {data.id}</Text>
      <Text style={styles.taskText}>{data.title}</Text>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => {
          return (
            <CustomButton
            {...props}
              key={index}
              type={button.type}
              style={button.style}
              allFunctions={props?.allFunctions}
              id={data?.id}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFEC',
    borderWidth: 2,
    elevation: 7,
    padding: 7,
    borderRadius: 5,
    marginVertical: 5,
  },
  idText: {
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: '800',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  taskText: {
    paddingVertical: 3,
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    paddingVertical: 5,
  },
});
