import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const pastDataRow = (period, accuracy, details) => (
  <View style={styles.pastContainer}>
    <View>
      <Text
        style={{
          color: '#000',
          textTransform: 'capitalize',
          textAlign: 'left',
          lineHeight: 50,
          height: 50,
          fontSize: 10,
          fontWeight: 'bold',
        }}>
        {period + ':'}
      </Text>
    </View>
    <View style={styles.pastItem}>
      <Text style={{color: '#00FF00'}}>
        {(accuracy[period] * 100).toFixed(2)}
      </Text>
    </View>
    <View style={styles.pastItem}>
      <Text style={{color: '#00FF00'}}>{details[period].won}</Text>
    </View>
    <View style={styles.pastItem}>
      <Text style={{color: '#00FF00'}}>{details[period].lost}</Text>
    </View>
  </View>
);

const titleRow = () => (
  <View style={styles.pastContainer}>
    <View>
      <Text style={styles.smh}>{'period'}</Text>
    </View>
    <View>
      <Text style={styles.smh}>{'accuracy(%)'}</Text>
    </View>
    <View>
      <Text style={styles.smh}>{'won'}</Text>
    </View>
    <View>
      <Text style={styles.smh}>{'lost'}</Text>
    </View>
  </View>
);

const PastScreen = ({pastData: {accuracy, details}}) => {
  return (
    <View style={{overflow: 'scroll', paddingTop: 30}}>
      {titleRow()}
      {pastDataRow('yesterday', accuracy, details)}
      {pastDataRow('last_7_days', accuracy, details)}
      {pastDataRow('last_14_days', accuracy, details)}
      {pastDataRow('last_30_days', accuracy, details)}
    </View>
  );
};

const styles = StyleSheet.create({
  pastContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#00FF00',
  },
  smh: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pastItem: {
    backgroundColor: '#000',
    width: '15%',
    lineHeight: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PastScreen;
