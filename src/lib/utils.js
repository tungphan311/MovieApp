import { Dimensions } from 'react-native';

export default class Constant {
    static BASE_URL = 'http://api.themoviedb.org/3/';
    static IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
    static API_KEY = 'ad3dddaf34c8f4d3be4bd729dfd665c2';
    static HEADER_MAX_HEIGHT = 200;
    static MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

    static SCREEN_HEIGHT = Dimensions.get('screen').height;
    static SCREEN_WIDTH = Dimensions.get('screen').width;
    static IS_IPHONE_X = Dimensions.get('screen').height === 812 || Dimensions.get('screen').height === 896;
}
