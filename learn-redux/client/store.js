import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import { watcherSaga } from './sagas';
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';
import { watcherSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

// Create an object for the default data
const defaultState = {
    posts,
    comments,
};

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
    rootReducer, 
    defaultState, 
    enhancers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watcherSaga);

export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
    module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;