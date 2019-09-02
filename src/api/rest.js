const BASE_URL = `http://api.themoviedb.org/3/`;

export default getNowPlayingMovies = () => {
    const now = new Date();

    const today = now.getDate();
    const begin = today > 15 ? ( today - 15 ) : ( today + 15 );

    const month = now.getMonth();

    const monthQuery = today > 15 ? ( month > 8 ? ( month + 1 ) : `0${month + 1}` ) : ( month > 8 ? month : `0${month}` );

    const startDay = `${now.getFullYear()}-${monthQuery}-${begin}`;
    const endDay = `${now.getFullYear()}-${monthQuery}-${today}`;

    const url = BASE_URL + `discover/movie?primary_release_date.lte=${endDay}&primary_release_date.gte=${startDay}`;

    return fetch(url).then(response => response.json()).then(responseJson => {
        return { result: responseJson };
    }).catch(error => {
        if (error) {
            console.log(error);
        }
    });
}