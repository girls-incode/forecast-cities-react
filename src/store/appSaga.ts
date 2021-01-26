import { call, all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { saveToLocalStorage } from './localstorage';
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
        // console.log('saga: ', res);
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

// function* getCityWeather({ codprov, codigoine }: any) {
//     const url = process.env.REACT_APP_REGIONES + '/' + codprov + '/municipios/' + codigoine;
//     try {
//         let res = yield fetchData(url);
//         console.log('getCityWeather: ', res);
//         yield put({ type: types.GET_CITY_WEATHER, payload: res });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export function* watchGetCityWeather() {
//     yield takeLatest(types.GET_CITY_WEATHER_SAGA, getCityWeather);
// }

function fetchApi(url: string) {
    return fetch(url)
        .then(response => response.json())
        .catch((error) => { throw error })
}

function* getApiData({ url }: any) {
    yield put({ type: types.FETCH_INIT });
    try {
        console.log(url);
        let res = yield call(fetchApi, url);
        // const data = yield res.json();
        console.log('getCityWeather: ', res);
        yield put({ type: types.FETCH_SUCCESS, payload: res });
    } catch (error) {
        yield put({ type: types.FETCH_FAILURE });
    }
}
export function* watchGetApiData() {
    yield takeLatest(types.FETCH_INIT_SAGA, getApiData);
}

function* getCitiesWeather({ urls }: any) {
    yield put({ type: types.FETCH_INIT });
    try {
        const promises = urls.map((url: any) => call(fetchApi, url));
        const result = yield all(promises);
        console.log(result);
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
        console.log(url);
        let res = yield call(fetchApi, url);
        console.log('getHome: ', res);
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
//         console.log(favData);
//         saveToLocalStorage("meteo_fav", favData);
//         yield put({ type: types.ADD_TO_FAVORITES, payload: favData });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export function* watchAddToFavorites() {
//     yield takeLatest(types.ADD_TO_FAVORITES_SAGA, addToFavorites);
// }