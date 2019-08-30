import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Search extends Component {
    handleInputChange = (text) => {
        const { inputChange } = this.props;

        inputChange(text);
    }
    render() {
        return (
            <View style={styles.searchWrapper}>
                <Icon name='ios-search' size={20} style={styles.searchIcon} />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder='Enter your movies' 
                    onChangeText={(text) => this.handleInputChange(text)} 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchWrapper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    searchIcon: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 0,
        paddingBottom: 10,
        paddingRight: 10,
    }
});
