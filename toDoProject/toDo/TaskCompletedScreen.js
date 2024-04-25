import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderListComponent from '../component/RenderListComponent';

export default function TaskCompletedScreen(props) {
  const data = props.data;
  const buttons = [
    {type: 'Remove', style: {backgroundColor: 'red', color: 'white'}},
  ];
  return (
    <View style={{flex: 1, padding: 10}}>
      {data.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text
            style={{
              paddingVertical: 10,
              color: 'black',
              fontWeight: '600',
              fontSize: 23,
              textAlign: 'center',
              paddingHorizontal: 10,
              lineHeight: 30,
            }}>
            Oops! You Have No Completed Tasks To Show
          </Text>
        </View>
      ) : (
        <Text
          style={{
            paddingVertical: 10,

            color: 'black',
            fontWeight: '600',
            fontSize: 19,
          }}>
          Your Completed Tasks
        </Text>
      )}

      <RenderListComponent
        {...props}
        data={data}
        buttons={buttons}
        cardStyle={{backgroundColor: '#A6FF96'}}
        allFunctions={props?.allFunctions}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
