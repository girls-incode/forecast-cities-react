import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './app/App';
// import createHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    {/* <Router history={history}> */}
    <Provider store={store}>
    <App />
    </Provider>
    {/* </Router>, */}
  </BrowserRouter>,
  document.getElementById('root')
);
