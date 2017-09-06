import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { browserHistory } from 'react-router';

import configureStore, { sagaMiddleware } from 'store';
import Root from 'config/Root';
import Sagas from 'sagas';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const store = configureStore(browserHistory);

sagaMiddleware.run(Sagas);

const history = createHistory();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    const newApp = require('./config/Root').default;
    render(newApp);
  });
}
