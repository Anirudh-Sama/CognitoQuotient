import React , {useLayoutEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';

import { COLORS, SIZES } from '../constants/theme'; // Update the path accordingly

const Result = () => {
    useLayoutEffect(() => {
        navigation.setOptions(
          {
           headerShown : false, 
          }
        )
    }, [])
  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();
  

  const renderData = () => {
    return Object.entries(data).map(([key, value], index) => (
      <View key={index} style={styles.dataContainer}>
        <Text style={styles.key}>{key}</Text>
        <Text style={styles.value}>{String(value)}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: COLORS.primary }]}>Upload Result</Text>
      <View style={styles.resultContainer}>{renderData()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.base * 2,
  },
  header: {
    fontSize: 24,
    marginBottom: SIZES.base * 2,
  },
  resultContainer: {
    width: '100%',
  },
  dataContainer: {
    marginVertical: SIZES.base,
  },
  key: {
    fontSize: 18,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default Result;
