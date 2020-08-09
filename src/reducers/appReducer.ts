import {AppStateType} from "types/reducerStateTypes";
import {Map} from 'immutable';
import {
    AppActionTypes,
    CHANGE_APP_ACTIVE,
    CHANGE_APP_BACKGROUND,
    SET_APP_LOADING,
    SetAppLoading,
} from "actionTypes/appActionTypes";
import {APP_STATE_ACTIVE, APP_STATE_BACKGROUND} from "common/const";
import {Alert} from "react-native";

const _initState: AppStateType = {
    currentAppState: undefined,
    fcmToken: undefined,
    devicePermissionMap: Map(),
    installTime: Date.now(),
    lastBackgroundTime: 0,
    lastForegroundTime: 0,
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
        isLoading
    } = state;
    return {
        fcmToken,
        devicePermissionMap: devicePermissionMap?.toObject(),
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
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
    } = state;
    return {
        ..._initState,
        fcmToken,
        devicePermissionMap: Map(devicePermissionMap),
        installTime,
        lastBackgroundTime,
        lastForegroundTime,
        isLoading: false
    }
};
