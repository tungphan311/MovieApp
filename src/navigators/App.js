import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import NowPlaying from '../containers/NowPlaying';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import TopRated from '../containers/TopRated';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorite from '../containers/Favorite';

const TabNavigator = createMaterialTopTabNavigator(
  {
    nowPlaying: { 
      screen: NowPlaying,
      navigationOptions: {
        tabBarLabel: 'Now playing',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-film" color={tintColor} size={24} />
        )
      }
    },
    topRated: { 
      screen: TopRated,
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
      inactiveTintColor: 'grey',
      style: { 
        backgroundColor: '#fff',
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

const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component {
  render () {
    return (
      <SafeAreaView style={{
        flex: 1, backgroundColor: '#f2f2f2'
      }} forceInset={{ top: 'always' }}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}