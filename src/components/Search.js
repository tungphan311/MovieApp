import React, { Component } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../lib/utils';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (Constant.IS_IPHONE_X ? 44 : 20) : 0;

export default class Search extends Component {
    handleInputChange = (text) => {
        const { inputChange } = this.props;

        inputChange(text);
    }
    render() {
        return (
            <View style={styles.searchWrapper}>
                <Icon 
                    name='ios-arrow-back' 
                    size={20} 
                    style={styles.searchIcon} 
                    color='#fff' 
                />
                <TextInput 
                    style={styles.searchInput} 
                    placeholder='Enter your movies' 
                    onChangeText={(text) => this.handleInputChange(text)} 
                />
                <Icon 
                    name='ios-close'
                    style={styles.searchIcon}
                    color='#fff'
                    size={24}
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
        backgroundColor: '#000',
        marginTop: STATUS_BAR_HEIGHT
    },
    searchIcon: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 0,
        paddingBottom: 10,
        paddingRight: 10,
        color: '#fff',
    }
});
