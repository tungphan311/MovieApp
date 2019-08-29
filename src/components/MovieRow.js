import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';

class MoviewRow extends Component {
    render() { 
        const { image, name, overview } = this.props;
        return (  
            <TouchableOpacity style={styles.container}>
                <Image 
                    source={{ uri: `${IMAGE_URL}${image}` }} 
                    style={styles.image} 
                />
                
                <View style={styles.info}>
                    <Text style={styles.title}>{name}</Text>
                    <Text 
                        style={styles.overview} 
                        ellipsizeMode='tail' 
                        numberOfLines={5}
                    >
                        {overview}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150, 
        flexDirection: "row", 
        backgroundColor: '#ffff80', 
        marginTop: 5
    },
    image: {
        flex: 1, 
        resizeMode: 'contain'
    },
    info: {
        flexDirection: 'column', 
        flex: 3,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1
    },
    overview: {
        flex: 2,
        fontSize: 12,
        color: 'grey',
        textAlign: 'justify',
        paddingBottom: 10
    }
})
 
export default MoviewRow;