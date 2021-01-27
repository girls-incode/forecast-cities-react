import { types } from './types';

export const getCities = () => ({ type: types.GET_CITIES_SAGA });
export const updateSelectedCity = (payload: any) => ({ type: types.UPDATE_SELECTED_CITY_SAGA, payload });
export const getCityWeather = (payload: any) => ({ type: types.GET_CITY_WEATHER_SAGA, payload });
export const loadRegions = () => ({ type: types.LOAD_REGIONS_SAGA });
export const updateListings = (payload: any) => ({ type: types.UPDATE_LISTINGS, payload });