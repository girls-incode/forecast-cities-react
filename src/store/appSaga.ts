import { call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import ApiHelper from './../utils/apiHelper';
import { types } from './types';

function* getRegions(action: any) {
    const url = process.env.REACT_APP_REGIONES || '';
    try {
        let res = yield fetch(url);
        res = yield res.json();
        yield put({ type: types.LOAD_REGIONS, payload: res.provincias });
    } catch (error) {
        console.log(error);
    }
}
export function* watchGetRegions() {
    yield takeEvery(types.LOAD_REGIONS_SAGA, getRegions);
}

function* getCities(action: any) {
    const url = process.env.REACT_APP_CITIES || '';
    try {
        let res = yield fetch(url);
        res = yield res.json();
        yield put({ type: types.GET_CITIES, payload: res });
    } catch (error) {
        console.log(error);
    }
}
export function* watchGetCities() {
    yield takeLatest(types.GET_CITIES_SAGA, getCities);
}

function* updateSelectedCity({ payload }: any) {
    yield put({ type: types.UPDATE_SELECTED_CITY, payload });
}
export function* watchUpdateSelectedCity() {
    yield takeLatest(types.UPDATE_SELECTED_CITY_SAGA, updateSelectedCity);
}

export function* getApiData({ url }: any) {
    yield put({ type: types.FETCH_INIT });
    try {
        let res = yield call(ApiHelper.fetchApi, url);
        yield put({ type: types.FETCH_SUCCESS, payload: res });
    } catch (error) {
        yield put({ type: types.FETCH_FAILURE, payload: error.message });
    }
}
export function* watchGetApiData() {
    yield takeLatest(types.FETCH_INIT_SAGA, getApiData);
}

function* getCitiesWeather({ urls }: any) {
    yield put({ type: types.FETCH_INIT });
    try {
        const promises = urls.map((url: any) => call(ApiHelper.fetchApi, url));
        const result = yield all(promises);
        yield put({ type: types.FETCH_SUCCESS_LIST, payload: result });
    } catch (error) {
        yield put({ type: types.FETCH_FAILURE });
    }
}
export function* watchGetCitiesWeather() {
    yield takeLatest(types.GET_CITIES_WEATHER_SAGA, getCitiesWeather);
}

function* getHome({ url }: any) {
    yield put({ type: types.HOME_INIT });
    try {
        let res = yield call(ApiHelper.fetchApi, url);
        yield put({ type: types.HOME_SUCCESS, payload: res });
    } catch (error) {
        yield put({ type: types.HOME_FAILURE });
    }
}
export function* watchGetHome() {
    yield takeLatest(types.HOME_INIT_SAGA, getHome);
}

// function* addToFavorites({ favData }: any) {
//     try {
//         saveToLocalStorage("meteo_fav", favData);
//         yield put({ type: types.ADD_TO_FAVORITES, payload: favData });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export function* watchAddToFavorites() {
//     yield takeLatest(types.ADD_TO_FAVORITES_SAGA, addToFavorites);
// }