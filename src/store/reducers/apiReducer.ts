import { types } from './../types';

const initState = {
    loading: false,
    error: false,
    list: [],
    item: {},
};

function apiReducer(state = initState, action: any) {
    switch (action.type) {
        case types.FETCH_INIT:
            return {
                ...state,
                loading: true,
                error: false
            }
        case types.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                item: action.payload
            }
        case types.FETCH_SUCCESS_LIST:
            return {
                ...state,
                loading: false,
                error: false,
                list: action.payload
            }
        case types.FETCH_SUCCESS_HOME:
            return {
                ...state,
                loading: false,
                error: false,
                home: action.payload
            }
        case types.FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: false
            }
        default:
            return state
    }
}
export default apiReducer;