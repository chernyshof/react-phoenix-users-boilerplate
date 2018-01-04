import 'babel-polyfill';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import reducers from 'reducers';


const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});
const useReduxLogger = false;

export const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
export default function configureStore(browserHistory) {
  const router = routerMiddleware(browserHistory);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  // const reduxRouterMiddleware = syncHistoryWithStore(browserHistory);

  let middleware = [sagaMiddleware, router];

  if (useReduxLogger && process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, loggerMiddleware];
  }

  const createStoreWithMiddleware =
    composeEnhancers(applyMiddleware(...middleware))(createStore);

  return createStoreWithMiddleware(reducers);
}
/* eslint-enable */
