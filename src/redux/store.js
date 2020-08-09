import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga'
import sagaMonitor from '@redux-saga/simple-saga-monitor'
import { Platform } from 'react-native';
import IosAsyncStorage from '@react-native-community/async-storage';
import AndroidAsyncStorage from 'redux-persist-filesystem-storage';
import { createMigrate, persistCombineReducers } from 'redux-persist'
import logger from 'redux-logger';
import reduxTransformer from "./reduxTransformer";
import authState from 'reducers/authReducer';
import homeState from 'reducers/homeReducer';
import appState from 'reducers/appReducer';
import accountState from 'reducers/accountReducer';
import notificationState from 'reducers/notificationReducer'

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const migrations = {
    0: (state) => {
        // migration clear out device state
        return {
            ...state,
        }
    },
    1: (state) => {
        // migration clear out device state
        return {
            authState: null,
            ...state,
        }
    },
    2: (state) => {
        // migration clear out device state
        return {
            ...state,
        }
    },
    3: (state) => {
        // migration clear out device state
        return {
            ...state,
        }
    },
    4: (state) => {
        // migration clear out device state
        return {
            ...state,
        }
    },
    5: (state) => {
        // migration clear out device state
        return {
            ...state,
        }
    },

};
const config = {
    key: 'primary',
    version: 6,
    transforms: [reduxTransformer],
    whitelist: [
        'appState',
        'authState',
        'accountState',
    ],
    storage: Platform.select({
        ios: IosAsyncStorage,
        android: AndroidAsyncStorage
    }),
    migrate: createMigrate(migrations, { debug: false }),
    timeout: __DEV__ ? 60000 : 10000,
};

const _combinedReducers = persistCombineReducers(config, {
    appState,
    authState,
    accountState,
    homeState,
    notificationState,
});

const __LOG_REDUX_ = false;

function initStore() {
    let _store;
    if (__DEV__) {
        const createDebugger = require('redux-flipper').default;
        let reduxDebugger = createDebugger();
        const _MIDDLE_WARES = [sagaMiddleware, reduxDebugger];
        if (__LOG_REDUX_) {
            _MIDDLE_WARES.push(logger);
        }
        _store = createStore(_combinedReducers,
            undefined,
            compose(applyMiddleware(..._MIDDLE_WARES))
        );
    }
    else {

        _store = createStore(_combinedReducers,
            undefined,
            compose(applyMiddleware(
                sagaMiddleware,
            ))
        );
    }
    _store.runSaga = sagaMiddleware.run;
    _store.close = () => {
        _store.dispatch(END);
    }
    return _store;
}


export default initStore();
