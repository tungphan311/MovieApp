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
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            movies: [],
            listMovies: [],
            refreshing: false,
            canLoadMore: true,
            url: '',
            page: 1,
            totalPage: 0,
        }
    }
    
    componentDidMount = () => {
        this.getNowPlayingMovies();
    }

    getNowPlayingMovies = () => {
        const { MOVIE_URL, API_KEY } = Constant;
        const url = MOVIE_URL + `now_playing?api_key=${API_KEY}`;
        this.setState({ url: url });

        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                movies: responseJson.results,
                listMovies: responseJson.results,
                isLoading: false,
                totalPage: responseJson.total_pages,
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

    onLoadMoreAsync = async () => {
        let { url, page, totalPage } = this.state;

        page += 1;
        this.setState({ page: page });

        if (page === totalPage) {
            this.setState({ canLoadMore: false });
        }

        url = `${url}&page=${page}`;
        // console.log(url);

        await fetch(url).then(response => response.json()).then(responseJson => {
            this.setState(curState => {
                let newMovies = [...curState.movies, ...responseJson.results];
                console.log(newMovies)
                return {
                    movies: newMovies,
                }
            })
        }).catch(error => {
            if (error) {
                console.log(error);
            }
        });
    }

    render() {
        const { isLoading, movies, refreshing, canLoadMore } = this.state;

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
                    renderScrollComponent={props => <InfiniteScrollView {...props} />}
                    canLoadMore={canLoadMore}
                    onLoadMoreAsync={this.onLoadMoreAsync}
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