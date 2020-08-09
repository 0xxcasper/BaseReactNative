import {
    AppActionTypes,
    CHANGE_APP_STATE,
    CHANGE_FCM_TOKEN,
    SET_APP_LOADING,
    SET_NUMBER_NOTIFY_BADGE
} from 'actionTypes/appActionTypes';

/*
* Update app state
* ACTIVE | INACTIVE | BACKGROUND
* */
export const changeAppStateAction = (appState: string): AppActionTypes => {
    return {
        type: CHANGE_APP_STATE,
        appState
    }
};

/*
* FCM token | device token receive for push notification
* */
export const changeFcmTokenAction = (fcmToken: string): AppActionTypes => {
    return {
        type: CHANGE_FCM_TOKEN,
        fcmToken
    }
};

/* Number notification non read */
export const setAppNotificationBadge = (numberBadge: number): AppActionTypes => {
    return {
        type: SET_NUMBER_NOTIFY_BADGE,
        numberBadge
    }
};

/*
* This app using app context for loading because if use Loading
* by Modal cant show another screen over Modal
* */
export const setAppLoadingAction = (isLoading: boolean): AppActionTypes => {
    return {
        type: SET_APP_LOADING,
        isLoading
    }
};