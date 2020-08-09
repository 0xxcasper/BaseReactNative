import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import {AppState, Platform} from 'react-native';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';
import {eventChannel} from 'redux-saga';
import {all, call, fork, put, select, take, takeLatest} from 'redux-saga/effects';
import {createAction} from "actions";
import {
    changeFcmTokenAction,
    loginWithDeviceTokenSuccess as loginWithDeviceTokenSuccessAction,
    onTapNotificationAlert,
    requestLoginWithDeviceToken as requestLoginWithDeviceTokenAction
} from "actions/appActions";
import {receiveCurrentLocation} from 'actions/mapActions';
import {push} from 'actions/navigationActions';
import {requestNotification as requestNotificationAction} from "actions/notificationActions";
import {REQUEST_ACCOUNT_INFO} from "actionTypes/accountActionTypes";
import {
    CHANGE_APP_ACTIVE,
    CHANGE_APP_BACKGROUND,
    CHANGE_APP_INACTIVE,
    DESTROY_APP,
    OPEN_LINK,
    REQUEST_CURRENT_LOCATION_USER,
    REQUEST_LOGIN_WITH_DEVICE_TOKEN,
    START_APP
} from "actionTypes/appActionTypes";
import {API_TOKEN_ERROR, AUTH_OK} from "actionTypes/authActionTypes";
import {REQUEST_CAR_BRAND_LIST} from "actionTypes/carActionTypes";
import CONST, {APP_STATE_ACTIVE, APP_STATE_BACKGROUND, APP_STATE_INACTIVE} from "common/const";
import {isBlank} from "helpers";
import {ROUTE_NOTIFICATIONS, ROUTE_WEB_VIEW} from 'navigation/routeNames';
import {networkEmitter} from "../network";
import {loginWithDeviceTokenApi} from "../network/index";
import {selectEmailAnonymousToken, selectFcmToken} from "selectors/appSelectors";
import RCTSFSafariViewController from 'react-native-inappbrowser-reborn';

const PushNotification = require("react-native-push-notification");

function* _requestLoginWithDeviceToken(action) {
    const {
        fcmToken,
        platform
    } = action
    try {
        const _result = yield loginWithDeviceTokenApi(fcmToken, platform);
        const { email } = _result.customer
        yield put(loginWithDeviceTokenSuccessAction(email));
    }
    catch (e) {
    }
}

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
        yield all([put(createAction(REQUEST_ACCOUNT_INFO)), put(createAction(REQUEST_CAR_BRAND_LIST))])
        yield take(CHANGE_APP_BACKGROUND);
    }
}

function* watchAppLifeCycle() {
    while (true) {
        yield take(START_APP);
        yield put(requestNotificationAction(() => { }, () => { }))
        yield all([fork(watchApiTokenError), fork(watchFcmToken)])
        switch (AppState.currentState) {
            case APP_STATE_ACTIVE:
                yield put(createAction(CHANGE_APP_ACTIVE));
                yield put(createAction(REQUEST_CURRENT_LOCATION_USER));
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

function* watchFcmToken() {
    const _currentFcmToken = yield select(selectFcmToken);
    const _platform = Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
    const _currentEmailAnonymous = yield select(selectEmailAnonymousToken);
    console.log('_currentFcmToken', _currentFcmToken);

    const _eventNotification = yield eventChannel(_emitter => {
        PushNotification.configure({
            onRegister: function (token) {
                if (isBlank(_currentFcmToken)) {
                    const _deviceToken = token.token
                    _emitter({
                        deviceToken: _deviceToken,
                        type: "SET_TOKEN"
                    });
                }
            },
            onNotification: function (notification) {
                if (notification) {
                    if (Platform.OS === 'ios' && notification.data.openedInForeground) {
                        notification.userInteraction = true;
                    }
                    _emitter({
                        notification: notification,
                        type: "SET_NOTIFICATION"
                    });
                }
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            senderID: "698018865900",
            popInitialNotification: true,
            requestPermissions: true,
        });
        return () => { }
    });
    while (true) {
        const _emitNotificationValue = yield take(_eventNotification);
        if (_emitNotificationValue) {
            const { deviceToken, notification, type } = _emitNotificationValue
            //handle register email and device token
            switch (type) {
                case "SET_TOKEN":
                    if (isBlank(_currentEmailAnonymous)) {
                        yield put(requestLoginWithDeviceTokenAction(deviceToken, _platform));
                    }
                    yield put(changeFcmTokenAction(deviceToken));
                    break;
                case "SET_NOTIFICATION":
                    //Handle event touch notification
                    let userInteraction = false 
                    if(Platform.OS === "ios") {
                        userInteraction = notification && notification.data && notification.data.userInteraction
                    } else {
                        userInteraction = notification && notification.userInteraction
                    }
                    if(userInteraction) {
                        yield put(push(ROUTE_NOTIFICATIONS))
                    }
                    yield put(requestNotificationAction(() => { }, () => { }))
                    yield put(onTapNotificationAlert(notification))
                    break;
            }
        }
    }
}

function* watchPermissionLocation() {
    yield takeLatest(REQUEST_CURRENT_LOCATION_USER, _setPermissions)
}

function* _setPermissions() {
    try {
        const custom = yield call(requestPermission, Platform.select({
            android: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
            ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
        }));
        if (custom && custom.length > 0) {
            if (Platform.select({
                android: custom[0].ACCESS_FINE_LOCATION,
                ios: custom[0].LOCATION_WHEN_IN_USE
            }) === RESULTS.GRANTED) {
                const _result = yield call(getCurrentPosition)
                yield put(receiveCurrentLocation({
                    latitude: _result.latitude,
                    longitude: _result.longitude
                }))
            }
        }
    } catch (err) {
        return err
    }
    return true;
};

const getCurrentPosition = async () => {
    try {
        const _result = await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    resolve(position.coords)
                },
                error => {
                    reject(error)
                },
                {
                    timeout: 20000,
                },
            );
        });
        return _result
    } catch (error) {
    }
}

const requestPermission = async requestedType => {
    try {
        const granted = await requestMultiple(requestedType);
        const access = Object.keys(granted).map(item => {
            const name = item.split('.').slice(-1)[0];
            const revObj = {};
            revObj[name] = granted[item];
            AsyncStorage.mergeItem('permissions', JSON.stringify(revObj));
            return revObj;
        });
        return access;
    } catch (e) {
        return e;
    }
};

function* _openLinkWith(optional) {
    try {
        if(optional) {
            let { url, route, title } = optional
            
            if(Platform.OS === "ios") {
                RCTSFSafariViewController.open(url);
                return
            }
            if(!route) {
                route = ROUTE_WEB_VIEW
            }
            yield put(push(route, { 
                path: url, 
                title 
            }))
        }
    }
    catch (e) {
    }
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

function* watchApiEmailAnonymous() {
    yield takeLatest(REQUEST_LOGIN_WITH_DEVICE_TOKEN, _requestLoginWithDeviceToken)
}

function* watchTapNotify() {
    // yield takeLatest(ON_TAP_NOTIFICATION_ALERT, _didTapNotify)
}

function* watchOpenLink() {
    while (true) {
        const { optional } = yield take([OPEN_LINK]);
        yield _openLinkWith(optional)
    }
}

export default function* () {
    yield all([
        watchAppLifeCycle(),
        watchAppStateChange(),
        controlAppState(),
        watchApiEmailAnonymous(),
        watchPermissionLocation(),
        watchTapNotify(),
        watchOpenLink()
    ]);
}
