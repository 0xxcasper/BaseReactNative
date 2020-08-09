import { CBErrorType } from 'types/errors';
import { Notification } from 'types/modelTypes';

const PREFIX                                    = 'NOTIFICATION_ACTION/';
export const REQUEST_NOTIFICATION_LIST          = PREFIX + 'REQUEST_NOTIFICATION_LIST';
export const RECEIVE_NOTIFICATION_LIST          = PREFIX + 'RECEIVE_NOTIFICATION_LIST';
export const REQUEST_NOTIFICATION_DETAIL        = PREFIX + 'REQUEST_NOTIFICATION_DETAIL';
export const RECEIVE_NOTIFICATION_DETAIL        = PREFIX + 'RECEIVE_NOTIFICATION_DETAIL';
export const CLEAR_NOTIFICATION_DETAIL          = PREFIX + 'CLEAR_NOTIFICATION_DETAIL';
export const CLEAR_NOTIFICATION_LIST            = PREFIX + 'CLEAR_NOTIFICATION_LIST';

export interface RequestNotificationListAction {
    type: typeof REQUEST_NOTIFICATION_LIST,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}1

export interface ReceiveNotificationListAction {
    type: typeof RECEIVE_NOTIFICATION_LIST,
    listNotify: Notification[],
}

export interface RequestNotificationDetailAction {
    type: typeof REQUEST_NOTIFICATION_DETAIL,
    notifyId: number | null | undefined
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveNotificationDetailAction {
    type: typeof RECEIVE_NOTIFICATION_DETAIL,
    notification: Notification,
}

export interface ClearNotificationDetailAction {
    type: typeof CLEAR_NOTIFICATION_DETAIL,
}

export interface ClearNotificationListAction {
    type: typeof CLEAR_NOTIFICATION_LIST,
}

export type NotificationActionTypes =
    RequestNotificationListAction
    | ReceiveNotificationListAction
    | RequestNotificationDetailAction
    | ReceiveNotificationDetailAction
    | ClearNotificationDetailAction
    | ClearNotificationListAction;
