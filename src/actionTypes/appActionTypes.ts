const PREFIX = 'APP_ACTION/';
export const START_APP = PREFIX + 'START_APP';
export const CHANGE_APP_ACTIVE = PREFIX + 'CHANGE_APP_ACTIVE';
export const CHANGE_APP_INACTIVE = PREFIX + 'CHANGE_APP_INACTIVE';
export const CHANGE_APP_BACKGROUND = PREFIX + 'CHANGE_APP_BACKGROUND';
export const DESTROY_APP = PREFIX + 'DESTROY_APP';
export const CHANGE_FCM_TOKEN = PREFIX + 'CHANGE_FCM_TOKEN';
export const REQUEST_LOGIN_WITH_DEVICE_TOKEN = PREFIX + 'REQUEST_LOGIN_WITH_DEVICE_TOKEN';
export const LOGIN_WITH_DEVICE_SUCCESS = PREFIX + 'LOGIN_WITH_DEVICE_SUCCESS';
export const ON_TAP_NOTIFICATION_ALERT = PREFIX + 'ON_TAP_NOTIFICATION_ALERT';
export const SET_NUMBER_APP_NOTIFICATION_BADGE = PREFIX + 'SET_NUMBER_APP_NOTIFICATION_BADGE';
export const SET_APP_LOADING = PREFIX + 'SET_APP_LOADING';
export const REQUEST_CURRENT_LOCATION_USER = PREFIX + 'REQUEST_CURRENT_LOCATION_USER';
export const OPEN_LINK = PREFIX + 'OPEN_LINK'

export interface ChangeFcmAction {
    type: string,
    fcmToken: string | null | undefined,
}

export interface ChangeAppStateAction {
    type: string,
    appState: string,
}

export interface LoginWithDeviceTokenAction {
    type: typeof REQUEST_LOGIN_WITH_DEVICE_TOKEN,
    platform: string | null | undefined,
    fcmToken: string | null | undefined,
}

export interface LoginWithDeviceTokenSuccessAction {
    type: typeof LOGIN_WITH_DEVICE_SUCCESS,
    emailAnonymous: string | null | undefined,
}

export interface OnTapNotificationAlert {
    type: typeof ON_TAP_NOTIFICATION_ALERT,
    notification: any | null | undefined
}

export interface SetNumberAppNotificationBadge {
    type: typeof SET_NUMBER_APP_NOTIFICATION_BADGE,
    numberBadge: number | null | undefined
}

export interface SetAppLoading {
    type: typeof SET_APP_LOADING,
    isLoading: boolean
}

export interface OpenLink {
    type: typeof OPEN_LINK,
    optional: any
}


export type AppActionTypes = ChangeFcmAction 
            | ChangeAppStateAction 
            | LoginWithDeviceTokenAction 
            | LoginWithDeviceTokenSuccessAction 
            | OnTapNotificationAlert 
            | SetNumberAppNotificationBadge
            | SetAppLoading
            | OpenLink;
