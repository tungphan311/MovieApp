import React, { Component } from 'react';
import { View, TextInput, StyleSheet, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Constant from '../lib/utils';
import Loading from '../components/Loading';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Card from '../components/Card';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (Constant.IS_IPHONE_X ? 44 : 20) : 0;

export default class Search extends Component {
    state = {
        text: '', 
        movies: [],
        loading: false,
        refreshing: false,
        canLoadMore: true,
        url: '',
        page: 1,
        totalPage: 0,
    }

    handleKeyPress = () => {
        const { text } = this.state;
        const { BASE_URL, API_KEY } = Constant;

        this.setState({ loading: true });

        const url = `${BASE_URL}search/movie?api_key=${API_KEY}&query=${text}`;

        console.log('url: ', url)

        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                url: url,
                movies: responseJson.results,
                loading: false
            })
        });
    }

    onRefresh = () => {

    }

    onLoadMoreAsync = async () => {
        let { url, page, totalPage } = this.state;

        page += 1;
        this.setState({ page: page });

        if (page === totalPage) {
            this.setState({ canLoadMore: false });
        }

        url = `${url}&page=${page}`;

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

    renderContent = () => {
        const { movies, loading, refreshing, canLoadMore } = this.state;
        console.log(movies)

        if (loading) {
            return (
                <Loading />
            )
        }
        
        return (
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
        )
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

    render() {
        const { navigation } = this.props;
        let { text } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.searchWrapper}>
                    <Icon 
                        name='ios-arrow-back'
                        style={styles.searchIcon}
                        color='#fff'
                        size={24}
                        onPress={() => navigation.goBack()}  
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Enter your movie'
                        placeholderTextColor='#d2d2d2'
                        onChangeText={(text) => {this.setState({text})}}
                        value={text}
                        returnKeyType='search'
                        onSubmitEditing={this.handleKeyPress}
                    />
                    <Icon 
                        name='ios-close'
                        style={styles.searchIcon}
                        color='#fff'
                        size={24}
                        onPress={() => {this.setState({text: ''})}}
                    />
                </View>

                { this.renderContent() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        flexDirection: 'column'
    },
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        paddingTop: STATUS_BAR_HEIGHT,
        paddingBottom: 10
    },
    searchIcon: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    input: {
        flex: 1,
        color: '#fff',
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
})
