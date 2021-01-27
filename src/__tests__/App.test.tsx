import React from 'react';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import App from '../app/App';

configure({ adapter: new Adapter() });
const initState = {};
const mockStore = configureStore();

describe('Header', () => {
    let store;

    beforeEach(() => {
        store = mockStore(initState);
    });

    it('test app', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('.logo')).toBeDefined();
    });
});