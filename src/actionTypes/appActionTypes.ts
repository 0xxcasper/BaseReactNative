const PREFIX                              = 'APP_ACTION/';
export const START_APP                    = PREFIX + 'START_APP';
export const CHANGE_APP_STATE             = PREFIX + 'CHANGE_APP_STATE';
export const CHANGE_APP_ACTIVE            = PREFIX + 'CHANGE_APP_ACTIVE';
export const CHANGE_APP_INACTIVE          = PREFIX + 'CHANGE_APP_INACTIVE';
export const CHANGE_APP_BACKGROUND        = PREFIX + 'CHANGE_APP_BACKGROUND';
export const DESTROY_APP                  = PREFIX + 'DESTROY_APP';
export const CHANGE_FCM_TOKEN             = PREFIX + 'CHANGE_FCM_TOKEN';
export const SET_NUMBER_NOTIFY_BADGE      = PREFIX + 'SET_NUMBER_NOTIFY_BADGE';
export const SET_APP_LOADING              = PREFIX + 'SET_APP_LOADING';

export interface ChangeAppStateAction {
    type: typeof CHANGE_APP_STATE,
    appState: string,
}

export interface ChangeFcmAction {
    type: typeof CHANGE_FCM_TOKEN,
    fcmToken: string,
}

export interface SetAppNotifyBadge {
    type: typeof SET_NUMBER_NOTIFY_BADGE,
    numberBadge: number | null | undefined
}

export interface SetAppLoading {
    type: typeof SET_APP_LOADING,
    isLoading: boolean
}

export type AppActionTypes = ChangeFcmAction 
            | ChangeAppStateAction
            | SetAppNotifyBadge
            | SetAppLoading;
