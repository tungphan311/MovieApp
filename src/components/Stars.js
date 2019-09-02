import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Stars extends Component {
    render() {
        let { vote } = this.props;
        vote /= 2;
        
        const floor = Math.floor(vote);
        let rational = vote - floor;

        if (rational <= 0.25) {
            rational = 0;
        } else if (rational > 0.25 && rational <= 0.75) {
            rational = 0.5;
        } else {
            rational = 1;
        }

        var rating = [];

        for(var i = 0; i < 5; i++) {
            if (i < floor) {
                rating.push(
                    <Icon 
                        key={i}
                        name='star' 
                        style={styles.star}
                        size={20} 
                    />
                );
            } else {
                if (i === floor) {
                    if (rational > 0) {
                        rating.push(
                            <Icon 
                                key={i}
                                name={ rational === 1 ? 'star' : 'star-half-o' } 
                                style={styles.star}
                                size={20} 
                            />
                        );
                    } else {
                        rating.push(
                            <Icon
                                key={i} 
                                name='star-o' 
                                style={styles.starO}
                                size={20} 
                            />
                        );
                    }
                } else {
                    rating.push(
                        <Icon 
                            key={i}
                            name='star-o' 
                            style={styles.starO}
                            size={20} 
                        />
                    );
                }
            }
            
        } 

        return (
            <View style={{ flexDirection: 'row' }}>
                { rating }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    star: {
        paddingTop: 10,
        color: 'orange',
        paddingLeft: 5
    },
    starO: {
        paddingTop: 10,
        color: 'white',
        paddingLeft: 5
    }
});
