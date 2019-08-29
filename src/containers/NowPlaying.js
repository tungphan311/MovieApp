import React, { Component } from 'react';
import { View, Text, Button } from "react-native";

class NowPlaying extends Component {
    render() {
        const { navigate, push } = this.props.navigation;
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Now playing screen</Text>
            <Button 
                title="Top rated"
                onPress={() => navigate('topRated')}
            />
            </View>
        );
    }
}

export default NowPlaying;