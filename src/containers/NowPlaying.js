import React, { Component } from 'react';
import { 
    View, 
    ActivityIndicator, 
    FlatList, 
    StyleSheet,
    RefreshControl
} from "react-native";
import Card from '../components/Card';
import '../api/rest';
import Search from '../components/Search';
import Constant from '../lib/utils';

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            movies: [],
            listMovies: [],
            refreshing: false,
        }
    }
    
    componentDidMount = () => {
        this.getNowPlayingMovies();
    }

    getNowPlayingMovies = () => {
        const now = new Date();
    
        let today = now.getDate();
        let begin = today > 15 ? ( today - 15 ) : ( today + 15 );

        if (today < 10) {
            today = `0${today}`;
        }

        if (begin < 10) {
            begin = `0${begin}`;
        }
    
        const month = now.getMonth();

        let beginMonth;
        const endMonth = month > 8 ? ( month + 1 ) : `0${month + 1}`;
    
        if (today > 15) {
            beginMonth = month > 8 ? ( month + 1 ) : `0${month + 1}`;
        } else {
            beginMonth = month > 8 ?  month : `0${month}`;
        }
    
        const startDay = `${now.getFullYear()}-${beginMonth}-${begin}`;
        const endDay = `${now.getFullYear()}-${endMonth}-${today}`;
    
        const url = Constant.BASE_URL + `discover/movie?primary_release_date.lte=${endDay}&primary_release_date.gte=${startDay}`;
    
        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                movies: responseJson.results,
                listMovies: responseJson.results,
                isLoading: false
            })
        }).catch(error => {
            if (error) {
                console.log(error);
            }
        });
    }

    renderItem = (item) => {
        const { poster_path, title, overview, id, vote_average } = item;
        const { navigation } = this.props;

        return (
            <Card 
                image={poster_path} 
                name={title} 
                overview={overview} 
                navigation={navigation}
                id={id}
                rating={vote_average}
            />
        )
    }

    inputChange = (text) => {
        let { listMovies } = this.state;

        movies = listMovies.filter(movie => movie.title.toLowerCase().includes(text.toLowerCase()));

        this.setState({ movies: movies });
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.getNowPlayingMovies().then(() => {
            this.setState({refreshing: false});
        });
    }

    render() {
        const { isLoading, movies, refreshing } = this.state;

        if (isLoading) {
            return (
                <View style={{flex: 1, padding: 20, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#000' }}>
                <Search inputChange={this.inputChange} />
                <FlatList
                    contentContainerStyle={styles.grid}
                    data={movies}
                    renderItem={({item}) => this.renderItem(item)}
                    numColumns={2}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    grid: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

export default NowPlaying;