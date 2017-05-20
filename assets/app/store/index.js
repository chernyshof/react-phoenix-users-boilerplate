import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import sagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';


import reducers from '../reducers';

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

/* eslint-disable no-underscore-dangle */
export default function configureStore(browserHistory) {
  const router = routerMiddleware(browserHistory);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // const reduxRouterMiddleware = syncHistoryWithStore(browserHistory);
  const createStoreWithMiddleware =
    composeEnhancers(applyMiddleware(sagaMiddleware, router, loggerMiddleware))(createStore);

  return createStoreWithMiddleware(reducers);
}
/* eslint-enable */
