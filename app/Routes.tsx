import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ConfigurationPage from './containers/ConfigurationPage';
import ImagePage from './containers/ImagePage';

export default function Routes() {
  return (
    <App>
      <Switch>
       
        <Route path={routes.CONFIGURATION} component={ConfigurationPage} />
        <Route path={routes.IMAGE} component={ImagePage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
