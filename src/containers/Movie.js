import React, { Component } from 'react';
import { 
    View, 
    Text,  
    StyleSheet, 
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import Icon from 'react-native-vector-icons/Ionicons';
import Constant from '../lib/utils';
import Stars from '../components/Stars';
import Loading from '../components/Loading';
import Card from '../components/Card';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (Constant.IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (Constant.IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default class Movie extends Component {
    state = {
        movie: {},
        movieLoading: true,
        similarLoading: true,
        similar: [],
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        const id = navigation.getParam('id', 0);

        this.getMovieDetail(id);
        this.getSimilarMovies(id);
    }

    getMovieDetail = (id) => {
        const url = `${Constant.MOVIE_URL}${id}?api_key=${Constant.API_KEY}`;

        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                movie: responseJson,
                movieLoading: false,
            });
        });
    }

    getSimilarMovies = (id) => {
        const url = `${Constant.MOVIE_URL}${id}/similar?api_key=${Constant.API_KEY}`;

        return fetch(url).then(response => response.json()).then(responseJson => {
            this.setState({
                similar: responseJson.results,
                similarLoading: false,
            })
        });
    }

    getGenres = (genres) => {
        var genre = '';

        genres.map(g => {
            genre += g.name;

            if (genres.indexOf(g) < genres.length - 1) {
                genre += ', ';
            }
        });

        return genre;
    }

    customLength = (length) => {
        const q = parseInt(length / 60);
        const r = length - q*60;

        let result = '';
        result += q > 0 ? (q === 1 ? '1 hour ' : `${q} hours `) : '';
        result += `${r} minutes`;

        return result;
    }

    renderContent = () => {
        const { movie } = this.state;

        const { 
            release_date, 
            genres, 
            vote_average, 
            overview, 
            production_countries, 
            runtime, 
            spoken_languages 
        } = movie;

        const genre = this.getGenres(genres);

        const country = this.getGenres(production_countries);

        const data = [
            { key: 'Overview:', value: overview },
            { key: 'Release: ', value: release_date },
            { key: 'Genres: ', value: genre },
            { key: 'Countries of origin:', value: country },
            { key: 'Length:', value: this.customLength(runtime) },
            { key: 'Languages:', value: this.getGenres(spoken_languages) }
        ];

        var content = [];

        data.map((item, index) => {
            const { key, value } = item;
            content.push(this.renderRow(key, value, index));
        });

        return (
            <ScrollView style={styles.content}>
                <Stars vote={vote_average} />
                { content }

                <View style={styles.similar}>
                    <Text style={styles.label}>Similar</Text>

                    { this.renderSimilarMovies() }
                </View>
            </ScrollView>
        )
    }

    renderRow = (key, value, index) => {
        return (
            <View key={index} style={styles.contentView}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        )
    }

    renderSimilarMovies = () => {
        const { similarLoading, similar } = this.state;

        if (similarLoading) {
            return (
                <Loading />
            );
        }

        if (similar.length === 0) {
            return (
                <View style={styles.noRecords}>
                    <Text style={styles.value}>No film is similar to this film</Text>
                </View>
            )
        }

        return (
            <ScrollView style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
                <FlatList 
                    contentContainerStyle={styles.grid}
                    data={similar}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </ScrollView>
        );
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

    renderNavBar = () => {
        const { navigation } = this.props;
        return (
            <View style={styles.navContainer}>
                <View style={styles.statusBar} />
                <View style={styles.navBar}>
                    <TouchableOpacity style={styles.iconLeft} onPress={() => {navigation.goBack()}}>
                        <Icon name='ios-arrow-back' size={20} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
                        <Icon name='ios-heart' size={20} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } 

    render() {
        const { movie, movieLoading, similarLoading } = this.state;
        const { title, poster_path } = movie;
        const url = `${Constant.IMAGE_URL}${poster_path}`;

        const images = {
            uri: url,
            resizeMode: 'cover'
        }

        if (movieLoading) {
            return (
                <Loading />
            );
        }
        return (
            <View style={styles.container}>
                <ReactNativeParallaxHeader 
                    headerMinHeight={HEADER_HEIGHT}
                    headerMaxHeight={Constant.SCREEN_WIDTH*4/3}
                    extraScrollHeight={20}
                    navbarColor="#000"
                    title=''
                    titleStyle={styles.titleStyle}
                    backgroundImage={images}
                    backgroundImageScale={1.2}
                    renderNavBar={this.renderNavBar}
                    renderContent={this.renderContent}
                    containerStyle={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    innerContainerStyle={styles.container}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    contentContainer: {
        flexGrow: 1,
    },
    navContainer: {
        height: HEADER_HEIGHT,
        marginHorizontal: 10,
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT,
        backgroundColor: 'transparent',
    },
    navBar: {
        height: NAV_BAR_HEIGHT,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    icon: {
        color: '#fff',
        margin: 10
    },
    label: {
        color: '#969e98',
        flex: 1, 
        fontWeight: 'bold',
        paddingRight: 5
    },
    value: {
        flex: 3, 
        color: '#fff',
        textAlign: 'justify',
        paddingRight: 10,
    },
    contentView: {
        flex: 1, 
        flexDirection: 'row', 
        padding: 10
    },
    similar: {
        flex: 1, 
        flexDirection: 'column', 
        padding: 10
    },
    grid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    noRecords: {
        height: 280,
        width: '100%',
        alignItems: 'center',
    }
});
