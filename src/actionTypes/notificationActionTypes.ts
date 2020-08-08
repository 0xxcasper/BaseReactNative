import { CBErrorType } from './../types/errors';
import { Notification } from './../types/modelTypes';

const PREFIX                                    = 'NOTIFICATION_ACTION/';
export const REQUEST_NOTIFICATION               = PREFIX + 'REQUEST_NOTIFICATION';
export const RECEIVE_NOTIFICATION               = PREFIX + 'RECEIVE_NOTIFICATION';
export const REQUEST_NOTIFICATION_DETAIL        = PREFIX + 'REQUEST_NOTIFICATION_DETAIL';
export const RECEIVE_NOTIFICATION_DETAIL        = PREFIX + 'RECEIVE_NOTIFICATION_DETAIL';
export const RESET_NOTIFICATION_DETAIL          = PREFIX + 'RESET_NOTIFICATION_DETAIL';
export const REQUEST_NOTIFICATION_MARK_READ     = PREFIX + 'REQUEST_NOTIFICATION_MARK_READ';
export const REQUEST_GET_SCREEN_NOTIFICATION    = PREFIX + 'REQUEST_GET_SCREEN_NOTIFICATION';
export const CLEAR_LIST_NOTIFY                  = PREFIX + 'CLEAR_LIST_NOTIFY';

export interface UpdateNotificationAction {
    type: typeof REQUEST_NOTIFICATION,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveNotificationAction {
    type: typeof RECEIVE_NOTIFICATION,
    notification: Notification[] | null | undefined,
}

export interface UpdateNotificationDetailAction {
    type: typeof REQUEST_NOTIFICATION_DETAIL,
    notificationId: number | null | undefined
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveNotificationDetailAction {
    type: typeof RECEIVE_NOTIFICATION_DETAIL,
    notification: Notification | null | undefined,
}

export interface ResetNotificationDetailAction {
    type: typeof RESET_NOTIFICATION_DETAIL,
}

export interface UpdateNotificationMarkReadAction {
    type: typeof REQUEST_NOTIFICATION_MARK_READ,
}

export type NotificationActionTypes = 
UpdateNotificationAction 
| ReceiveNotificationAction 
| UpdateNotificationDetailAction 
| ReceiveNotificationDetailAction
| ResetNotificationDetailAction
| UpdateNotificationMarkReadAction;