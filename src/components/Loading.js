import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1, 
        padding: 20, 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: '#000'
    },
})

export default Loading;
