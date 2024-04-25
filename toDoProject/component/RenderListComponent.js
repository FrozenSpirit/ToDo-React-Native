import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';

export default function RenderListComponent(props) {
  const data = props.data;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <CardComponent
            {...props}
              data={item}
              buttons={props?.buttons}
              cardStyle={props?.cardStyle}
              allFunctions={props?.allFunctions}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
