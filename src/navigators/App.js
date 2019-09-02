import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import Lists from '../containers/Lists';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorite from '../containers/Favorite';
import Movie from '../containers/Movie';

const TabNavigator = createMaterialTopTabNavigator(
  {
    nowPlaying: { 
      screen: props => <Lists {...props} tabs='now_playing' />,
      navigationOptions: {
        tabBarLabel: 'Now playing',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-film" color={tintColor} size={24} />
        )
      }
    },
    topRated: { 
      screen: props => <Lists {...props} tabs='top_rated' />,
      navigationOptions: {
        tabBarLabel: 'Top rated',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-star" color={tintColor} size={24} />
        )
      }
    },
    favorite: {
      screen: Favorite,
      navigationOptions: {
        tabBarLabel: 'Favorite',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-heart" color={tintColor} size={24} />
        )
      }
    }
  }, 
  {
    initialRouteName: 'nowPlaying',
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: '#fff',
      style: { 
        backgroundColor: 'grey',
        borderTopWidth: 0.5,
        borderTopColor: 'grey'
      },
      shifting: true,
      showIcon: true,
      
      indicatorStyle: {
        height: 0
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    home: TabNavigator,
    movie: { screen: Movie }
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render () {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#000'
      }} forceInset={{ top: 'never', bottom: 'never' }}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}