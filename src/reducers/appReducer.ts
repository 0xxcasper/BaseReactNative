import { LoginWithDeviceTokenSuccessAction, SET_NUMBER_APP_NOTIFICATION_BADGE, SetNumberAppNotificationBadge } from './../actionTypes/appActionTypes';
import { AppStateType } from "../types/reducerStateTypes";
import { Map } from 'immutable';
import {
    AppActionTypes,
    CHANGE_APP_ACTIVE,
    CHANGE_APP_BACKGROUND,
    CHANGE_FCM_TOKEN,
    ChangeFcmAction,
    LOGIN_WITH_DEVICE_SUCCESS
} from "../actionTypes/appActionTypes";
import { APP_STATE_ACTIVE, APP_STATE_BACKGROUND } from "../common/const";
import { SET_APP_LOADING, SetAppLoading } from '../actionTypes/appActionTypes';
const PushNotification = require("react-native-push-notification");

const _initState: AppStateType = {
    currentAppState: undefined,
    fcmToken: undefined,
    devicePermissionMap: Map(),
    installTime: Date.now(),
    lastBackgroundTime: 0,
    lastForegroundTime: 0,
    location: null,
    emailAnonymous: null,
    applicationBadge: null,
    isLoading: false
};
const _changeAppStateActive = (state: AppStateType): AppStateType => {
    if (state.currentAppState !== APP_STATE_ACTIVE) {
        return {
            ...state,
            currentAppState: APP_STATE_ACTIVE,
            lastForegroundTime: Date.now(),
        }
    }
    return state;
};
const _changeAppStateBackground = (state: AppStateType): AppStateType => {
    if (state.currentAppState !== APP_STATE_BACKGROUND) {
        return {
            ...state,
            currentAppState: APP_STATE_BACKGROUND,
            lastBackgroundTime: Date.now(),
        }
    }
    return state;
};
const _changeFcmToken = (state: AppStateType, action: AppActionTypes): AppStateType => {
    const _action: ChangeFcmAction = action as ChangeFcmAction;
    return {
        ...state,
        fcmToken: _action.fcmToken
    };
};

const _changeEmailAnonymous = (state: AppStateType, action: AppActionTypes): AppStateType => {
    const _action: LoginWithDeviceTokenSuccessAction = action as LoginWithDeviceTokenSuccessAction;
    return {
        ...state,
        emailAnonymous: _action.emailAnonymous
    };
};

const _setNumberAppNotificationBadge = (state: AppStateType, action: AppActionTypes): AppStateType => {
    const _action: SetNumberAppNotificationBadge = action as SetNumberAppNotificationBadge;
    const { numberBadge } = _action
    const _numberBadge = (numberBadge && numberBadge > 0) ? numberBadge : null
    PushNotification.setApplicationIconBadgeNumber(Number(_numberBadge));

    return {
        ...state,
        applicationBadge: _numberBadge
    };
};

const _setAppLoading = (state: AppStateType, action: AppActionTypes): AppStateType => {
    const _action: SetAppLoading = action as SetAppLoading;
    const {
        isLoading
    } = _action

    return {
        ...state,
        isLoading
    };
};

export default (state: AppStateType = _initState, action: AppActionTypes): AppStateType => {
    switch (action.type) {
        case CHANGE_APP_ACTIVE:
            return _changeAppStateActive(state);
        case CHANGE_APP_BACKGROUND:
            return _changeAppStateBackground(state);
        case CHANGE_FCM_TOKEN:
            return _changeFcmToken(state, action);
        case LOGIN_WITH_DEVICE_SUCCESS:
            return _changeEmailAnonymous(state, action);
        case SET_NUMBER_APP_NOTIFICATION_BADGE:
            return _setNumberAppNotificationBadge(state, action);
        case SET_APP_LOADING:
            return _setAppLoading(state, action)
    }
    return state;
}
export const appStateToJs = (state: AppStateType): any => {
    const {
        fcmToken,
        devicePermissionMap,
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
        location,
        emailAnonymous,
        isLoading
    } = state;
    return {
        fcmToken,
        devicePermissionMap: devicePermissionMap.toObject(),
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
        location,
        emailAnonymous,
        isLoading
    }
};
export const appStateFromJs = (state: any): AppStateType => {
    const {
        fcmToken,
        devicePermissionMap,
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
        location,
        emailAnonymous,
        isLoading
    } = state;
    return {
        ..._initState,
        fcmToken,
        devicePermissionMap: Map(devicePermissionMap),
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
        location,
        emailAnonymous,
        isLoading: false
    }
};
