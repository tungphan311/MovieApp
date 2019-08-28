import React, { Component } from 'react';
import { View, Text, Button } from "react-native";

class TopRated extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Top rated screen</Text>
            <Button 
                title="Now playing"
                onPress={() => navigate('nowPlaying')}
            />
            </View>
        );
    }
}

export default TopRated;