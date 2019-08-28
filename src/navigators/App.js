import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import NowPlaying from '../containers/NowPlaying';
import TopRated from '../containers/TopRated';

const AppNavigator = createStackNavigator({
  nowPlaying: {
    screen: NowPlaying
  },
  topRated: { screen: TopRated }
}, {
  initialRouteName: 'nowPlaying'
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render () {
    return (
      <AppContainer />
    );
  }
}