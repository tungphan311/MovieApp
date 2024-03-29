import React, { Component } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';
import Constant from '../lib/utils';
import Stars from './Stars';
import { Image } from 'react-native-elements';

class Card extends Component {
    renderImage = (image) => {
        if (image === null) {
            return (
                <Image 
                    source={require('../images/sorry-image-not-available.jpg')} 
                    style={styles.image} 
                />
            )
        }
        return (
            <Image 
                source={{ uri: `${Constant.IMAGE_URL}${image}` }} 
                style={styles.image} 
                PlaceholderContent={<ActivityIndicator />}
            />
        );
    }

    render() { 
        const { 
            image, 
            name, 
            navigation, 
            id, 
            rating 
        } = this.props;
        const { push } = navigation;

        return (  
            <TouchableOpacity 
                style={styles.container} 
                onPress={() => push('movie', { id: id })}
            >
                { this.renderImage(image) }

                <Stars vote={rating} />
                <Text style={styles.title}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin:5,
        width: 150,
        height: 280,
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    info: {
        flexDirection: 'column', 
        flex: 3,
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        fontSize: 14,
        fontWeight: 'bold',
        flex: 1,
        textAlign:'center',
        color: '#fff',
    },
    
})
 
export default Card;