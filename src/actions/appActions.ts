import {
    AppActionTypes,
    CHANGE_FCM_TOKEN,
    LOGIN_WITH_DEVICE_SUCCESS,
    REQUEST_LOGIN_WITH_DEVICE_TOKEN,
    SET_APP_LOADING,
    SET_NUMBER_APP_NOTIFICATION_BADGE
} from 'actionTypes/appActionTypes';

export const changeFcmToken = (fcmToken: string | null | undefined): AppActionTypes => {
    return {
        type: CHANGE_FCM_TOKEN,
        fcmToken: fcmToken
    }
};

export const requestLoginWithDeviceToken = (fcmToken: string | null | undefined, platform: string | null | undefined): AppActionTypes => {
    return {
        type: REQUEST_LOGIN_WITH_DEVICE_TOKEN,
        fcmToken: fcmToken,
        platform: platform
    }
};

export const loginWithDeviceTokenSuccess = (emailAnonymous: string | null | undefined): AppActionTypes => {
    return {
        type: LOGIN_WITH_DEVICE_SUCCESS,
        emailAnonymous: emailAnonymous,
    }
};

export const setAppNotificationBadge = (numberBadge: number): AppActionTypes => {
    return {
        type: SET_NUMBER_APP_NOTIFICATION_BADGE,
        numberBadge
    }
};

export const setAppLoadingAction = (isLoading: boolean): AppActionTypes => {
    return {
        type: SET_APP_LOADING,
        isLoading
    }
};