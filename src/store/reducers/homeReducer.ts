import { types } from './../types';

const initState = {
    loading: false,
    error: false,
    data: {}
};

function homeReducer(state = initState, action: any) {
    switch (action.type) {
        case types.HOME_INIT:
            return {
                ...state,
                loading: true,
                error: false
            }
        case types.HOME_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.payload
            }
        case types.HOME_FAILURE:
            return {
                ...state,
                loading: false,
                error: false
            }
        default:
            return state
    }
}
export default homeReducer;