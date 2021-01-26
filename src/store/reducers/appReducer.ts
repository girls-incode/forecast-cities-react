import { types } from '../types';
import { loadFromLocalStorage, saveToLocalStorage } from '../localstorage';
import { filterByCode } from '../../utils/general';

const initState = {
    regions: [],
    cities: [],
    listings: [],
    favorites: loadFromLocalStorage("meteo_fav") || [],
    selectedCity: []
}

function appReducer(state = initState, { type, payload }: any) {
    switch (type) {
        case types.LOAD_REGIONS:
            return {
                ...state,
                regions: payload,
            }
        case types.GET_CITIES:
            return {
                ...state,
                cities: payload,
            }
        case types.UPDATE_SELECTED_CITY:
            return {
                ...state,
                selectedCity: payload,
            }
        case types.ADD_TO_FAVORITES:
            const newFav = [...state.favorites, payload];
            saveToLocalStorage("meteo_fav", newFav);
            return {
                ...state,
                favorites: newFav,
            }
        case types.REMOVE_FROM_FAVORITES:
            const newList = filterByCode(state.favorites, payload);
            saveToLocalStorage("meteo_fav", newList);
            return {
                ...state,
                favorites: newList,
            }
        case types.UPDATE_FAVORITES:
            saveToLocalStorage("meteo_fav", payload);
            return {
                ...state,
                favorites: payload,
            }
        default:
            return state;
    }
}
export default appReducer;