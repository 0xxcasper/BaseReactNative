import {Alert, AppState} from 'react-native';
import {eventChannel} from 'redux-saga';
import {all, fork, put, take} from 'redux-saga/effects';
import {createAction} from "actions";
import {REQUEST_ACCOUNT_INFO} from "actionTypes/accountActionTypes";
import {
    CHANGE_APP_ACTIVE,
    CHANGE_APP_BACKGROUND,
    CHANGE_APP_INACTIVE,
    DESTROY_APP,
    START_APP
} from "actionTypes/appActionTypes";
import {AUTH_OK} from "actionTypes/authActionTypes";
import CONST, {
    APP_STATE_ACTIVE,
    APP_STATE_BACKGROUND,
    APP_STATE_INACTIVE
} from "common/const";
import {networkEmitter} from "network";

function* watchAppStateChange() {
    const _appStateChannel = eventChannel((_emitter) => {
        AppState.addEventListener("change", _emitter);
        return () => {
            AppState.removeEventListener("change", _emitter);
        }
    });
    while (true) {
        const _nextAppState = yield take(_appStateChannel);
        switch (_nextAppState) {
            case APP_STATE_ACTIVE:
                yield put(createAction(CHANGE_APP_ACTIVE));
                break;
            case APP_STATE_INACTIVE:
                yield put(createAction(CHANGE_APP_INACTIVE));
                break;
            case APP_STATE_BACKGROUND:
                yield put(createAction(CHANGE_APP_BACKGROUND));
                break;
        }
    }
}

function* controlAppState() {
    while (true) {
        yield take(CHANGE_APP_ACTIVE);
        yield all([
            put(createAction(REQUEST_ACCOUNT_INFO)),
        ])
        yield take(CHANGE_APP_BACKGROUND);
    }
}

function* watchAppLifeCycle() {
    while (true) {
        yield take(START_APP);
        yield all([fork(watchApiTokenError), fork(watchFcmToken)])
        switch (AppState.currentState) {
            case APP_STATE_ACTIVE:
                yield put(createAction(CHANGE_APP_ACTIVE));
                break;
            case APP_STATE_INACTIVE:
                yield put(createAction(CHANGE_APP_INACTIVE));
                break;
            case APP_STATE_BACKGROUND:
                yield put(createAction(CHANGE_APP_BACKGROUND));
                break;
        }
        yield take([DESTROY_APP]);
    }
}

/*
* Get deviceToken | FCM Token here
* */
function* watchFcmToken() {

}

function* watchApiTokenError() {
    const _chan = yield eventChannel(_emitter => {
        networkEmitter.on(CONST.TOKEN_ERROR, _emitter);
        return () => {
            networkEmitter.removeListener(CONST.TOKEN_ERROR, _emitter);
        }
    });
    while (true) {
        yield take(_chan);
        yield put(createAction(API_TOKEN_ERROR));
        yield take([AUTH_OK]);
    }
}

export default function* () {
    yield all([
        watchAppLifeCycle(),
        watchAppStateChange(),
        controlAppState(),
    ]);
}
