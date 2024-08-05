import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import Home from './screens/Home';
import PastScreen from './screens/PastScreen';
import {icons, COLORS, FONTS, SIZES} from './constants/';
import {pastPredictions} from './data/past';
import {predictions} from './data/prediction';
const theme = {
  ...DefaultTheme,
  colors: {
    background: '#dadada',
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isPastLoading, setPastLoading] = useState(true);
  const [data, setData] = useState({});
  const [pastData, setPastData] = useState({});

  const fetchPastData = () => {
    // fetch(
    //   'https://football-prediction-api.p.rapidapi.com/api/v2/performance-stats?market=classic',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'x-rapidapi-key':
    //         '1216452585msh5f9b784b91197bap122962jsn36bc00ee3233',
    //       'x-rapidapi-host': 'football-prediction-api.p.rapidapi.com',
    //     },
    //   },
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setPastData(data.data);
    //     console.log(data);
    //     setPastLoading(false);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    setTimeout(() => {
      setPastData(pastPredictions);
      setPastLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchPastData();
    // fetch('https://football-prediction-api.p.rapidapi.com/api/v2/predictions', {
    //   method: 'GET',
    //   headers: {
    //     'x-rapidapi-key': '1216452585msh5f9b784b91197bap122962jsn36bc00ee3233',
    //     'x-rapidapi-host': 'football-prediction-api.p.rapidapi.com',
    //   },
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setTimeout(() => {
    //       setData(data.data);
    //       console.log(data.data);
    //       // if (data.data && data.data.length < 6) {
    //       //   fetchPastData();
    //       // }
    //       fetchPastData();
    //       setLoading(false);
    //     });
    //   }, 1000)
    //   .catch(err => {
    //     console.error(err);
    //   });
    // };
    setTimeout(() => {
      setData(predictions);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          options={{
            title: 'STAR TIPS ~',
            headerTintColor: '#000',
            headerTitleStyle: {...FONTS.navTitle},
            headerLeft: ({onPress}) => (
              <TouchableOpacity
                style={{marginLeft: SIZES.padding}}
                onPress={onPress}>
                <Image
                  source={icons.menu}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
            ),
            headerRight: ({onPress}) => (
              <TouchableOpacity
                style={{
                  marginRight: SIZES.padding,
                }}
                onPress={() => console.log('search pressed')}>
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </TouchableOpacity>
            ),
          }}>
          {props => (
            <Home
              {...props}
              isLoading={isLoading}
              data={data}
              pastData={pastData}
              isPastLoading={isPastLoading}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="PastScreen"
          options={{
            title: 'PAST DATA ACCURACY ~',
            headerTintColor: '#000',
            headerTitleStyle: {
              ...FONTS.navTitle,
              fontSize: 20,
              fontStyle: 'italic',
            },
          }}>
          {props => (
            <PastScreen
              {...props}
              isPastLoading={isPastLoading}
              pastData={pastData}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
