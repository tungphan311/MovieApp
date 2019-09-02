import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native';
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
                <Image 
                    source={ require('../images/logo.png') }
                    style={styles.logo}  
                />
                <Icon 
                    name='ios-search'
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
        justifyContent: 'space-between',
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
    },
    logo: {
        marginLeft: 20,
        width: 32,
        height: 32
    }
});
