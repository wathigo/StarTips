/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';

import PastScreen from './PastScreen';

const checkPrediction = (prediction, checkItem) =>
  prediction.split('').includes(checkItem) ? true : false;

const Game = ({game: {home_team, away_team, prediction, odds}}) => (
  <View style={styles.game}>
    <Text style={styles.teams}>{`${home_team} vs ${away_team}`}</Text>
    <View style={styles.odds}>
      <TouchableOpacity
        style={
          checkPrediction(prediction, '1') ? styles.teamWin : styles.teamLose
        }>
        <Text
          style={
            checkPrediction(prediction, '1')
              ? {color: '#000'}
              : {color: '#00FF00'}
          }>
          {odds['1']}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          checkPrediction(prediction, 'X') ? styles.teamWin : styles.teamLose
        }>
        <Text
          style={
            checkPrediction(prediction, 'X')
              ? {color: '#000'}
              : {color: '#00FF00'}
          }>
          {odds['X']}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          checkPrediction(prediction, '2') ? styles.teamWin : styles.teamLose
        }>
        <Text
          style={
            checkPrediction(prediction, '2')
              ? {color: '#000'}
              : {color: '#00FF00'}
          }>
          {odds['2']}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Home = ({isLoading, data, pastData, isPastLoading, navigation}) => {
  const renderItem = ({item}) => <Game game={item} />;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <View
          style={{
            backgroundColor: 'black',
            maxHeight: '94.5%',
          }}>
          <View style={styles.odds_title}>
            <View>
              <Text style={styles.home_title}>Teams</Text>
            </View>

            <View>
              <Text style={styles.home_title}>Home</Text>
            </View>

            <View>
              <Text style={styles.home_title}>Draw</Text>
            </View>

            <View>
              <Text style={styles.home_title}>Away</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
      {isPastLoading || data.length > 3 ? (
        <View
          style={{
            backgroundColor: '#000',
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'stretch',
          }}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('PastScreen')}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              SEE PAST PREDICTION ANALYSIS ->
            </Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: '#dadada',
            overflow: 'scroll',
            maxheight: '100%',
          }}>
          <Text
            h2
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            Past Predictions
          </Text>
          <PastScreen pastData={pastData} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'scroll',
  },
  game: {
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
  },
  teams: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '20%',
    color: '#FFF',
  },
  teamWin: {
    backgroundColor: '#00FF00',
    width: 50,
    lineHeight: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    padding: 4,
    alignItems: 'center',
  },
  teamLose: {
    backgroundColor: '#838383',
    width: 50,
    lineHeight: 50,
    height: 50,
    borderRadius: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  odds: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  odds_title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: 'grey',
  },
  home_title: {
    textTransform: 'uppercase',
    fontSize: 12,
    height: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: 'grey',
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
});

export default Home;
