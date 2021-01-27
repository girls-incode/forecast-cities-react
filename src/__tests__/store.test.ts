import { runSaga } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { types } from '../store/types';
import * as actions from '../store/actions';
import ApiHelper from './../utils/apiHelper';
import apiReducer from '../store/reducers/apiReducer';
import { getApiData } from '../store/appSaga';

describe('Store Actions', () => {
    it('should create the action getCities', () => {
        const expectedAction = { type: types.GET_CITIES_SAGA };
        expect(actions.getCities()).toEqual(expectedAction)
    });
});

describe("Reducers", () => {
    const initState = {
        loading: false,
        error: false,
        list: [],
        item: {},
    };
    it("should handle apiReducer FETCH_INIT", () => {
        expect(apiReducer(initState, { type: "FETCH_INIT" })).toEqual({
            list: [],
            item: {},
            loading: true,
            error: false
        });
    });
    it("should handle apiReducer FETCH_SUCCESS", () => {
        expect(apiReducer(initState, { type: "FETCH_SUCCESS", payload: { name: 'hey' } })).toEqual({
            list: [],
            item: { name: 'hey' },
            loading: false,
            error: false
        });
    });
});

describe('Sagas', () => {
    const url = 'https';
    const action = { type: types.FETCH_INIT_SAGA, payload: url };
    const generator = getApiData(action);

    it('should call FETCH_INIT action', () => {
        expect(generator.next().value).toEqual(put({ type: types.FETCH_INIT }));
    });

    it('should call fetchApi and dispatch actions', async () => {
        const dummyData = { name: "Data 1" } as any;
        const fetchApiMock = jest.spyOn(ApiHelper, 'fetchApi').mockImplementation((): any => Promise.resolve(dummyData));

        const dispatched: any[] = [];
        const expectedAction = [
            { type: 'FETCH_INIT' },
            { type: 'FETCH_SUCCESS', payload: { name: 'Data 1' } }
        ];

        await runSaga({
            dispatch: (action: any) => dispatched.push(action),
        }, getApiData, { type: 'ACTION_NAME' });

        expect(fetchApiMock).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual(expectedAction);
        fetchApiMock.mockClear();
    });

    it('Handles generator errors', () => {
        const err = new Error('text');
        generator.next();
        expect(generator.throw(err).value).toEqual(put({ type: types.FETCH_FAILURE, payload: err.message }));
    });
});