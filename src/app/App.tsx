import {
  EuiErrorBoundary,
  EuiPage,
  EuiPageBody,
  EuiPageContent
} from '@elastic/eui';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import City from '../components/City';
import Home from '../components/Home';
import Header from '../components/Header';
import Region from '../components/Region';
import './App.scss';

function App() {
  return (
    <EuiErrorBoundary>
      <EuiPage>
        <EuiPageBody component='main'>
          <Header />
          <EuiPageContent>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/provincias/:codprov' component={Region} />
              <Route exact path='/provincias/:codprov/municipios/:codigoine' component={City} />
              <Route path='*'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage >
    </EuiErrorBoundary>
  );
}

export default App;
