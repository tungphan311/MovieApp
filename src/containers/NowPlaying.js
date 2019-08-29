import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import MoviewRow from '../components/MovieRow';
import '../api/rest';

const BASE_URL = `http://api.themoviedb.org/3/`;

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            movies: [],
        }
    }
    
    componentDidMount = () => {
        this.getNowPlayingMovies();
    }

    getNowPlayingMovies = () => {
        const now = new Date();
    
        const today = now.getDate();
        const begin = today > 15 ? ( today - 15 ) : ( today + 15 );
    
        const month = now.getMonth();
    
        const monthQuery = today > 15 ? ( month > 8 ? ( month + 1 ) : `0${month + 1}` ) : ( month > 8 ? month : `0${month}` );
    
        const startDay = `${now.getFullYear()}-${monthQuery}-${begin}`;
        const endDay = `${now.getFullYear()}-${monthQuery}-${today}`;
    
        const url = BASE_URL + `discover/movie?primary_release_date.lte=${endDay}&primary_release_date.gte=${startDay}`;
    
        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                movies: responseJson,
                isLoading: false
            })
        }).catch(error => {
            if (error) {
                console.log(error);
            }
        });
    }

    renderItem = (item) => {
        const { poster_path, title, overview } = item;
        let image = poster_path.substring(1);
        console.log(image)
        return (
            <MoviewRow image={image} name={title} overview={overview} />
        )
    }

    render() {
        const { navigate, push } = this.props.navigation;
        const { isLoading, movies } = this.state;
        const { results } = movies;
        console.log(results)

        if (isLoading) {
            return (
                <View style={{flex: 1, padding: 20, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ height: '100%' }} 
                    data={results}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: '#f2f2f2',
    // },
})

export default NowPlaying;