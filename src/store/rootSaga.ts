import { all } from 'redux-saga/effects';
import {
    // watchGetRegions,
    watchGetCities,
    watchUpdateSelectedCity,
    watchGetApiData,
    watchGetCitiesWeather,
    watchGetHome
} from './appSaga';

export default function* rootSaga() {
    yield all([
        watchGetCities(),
        watchUpdateSelectedCity(),
        watchGetApiData(),
        watchGetCitiesWeather(),
        watchGetHome()
    ]);
}