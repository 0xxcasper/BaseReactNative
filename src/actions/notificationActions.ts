import {CBErrorType} from 'types/errors';
import {
    NotificationActionTypes,
    REQUEST_NOTIFICATION_LIST,
    RECEIVE_NOTIFICATION_LIST,
    REQUEST_NOTIFICATION_DETAIL,
    RECEIVE_NOTIFICATION_DETAIL,
    CLEAR_NOTIFICATION_DETAIL,
    CLEAR_NOTIFICATION_LIST,
} from 'actionTypes/notificationActionTypes';
import {Notification} from "types/modelTypes";

export const requestNotificationListAction = (
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
): NotificationActionTypes => {
    return {
        type: REQUEST_NOTIFICATION_LIST,
        resolve,
        reject,
    }
};

export const receiveNotificationListAction = (listNotify: Notification[]): NotificationActionTypes => {
    return {
        type: RECEIVE_NOTIFICATION_LIST,
        listNotify
    }
}

export const requestNotificationDetailAction = (
    notifyId: number,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
): NotificationActionTypes  => {
    return {
        type: REQUEST_NOTIFICATION_DETAIL,
        notifyId,
        resolve,
        reject
    }
}

export const receiveNotificationDetailAction = (notification: Notification[]): NotificationActionTypes => {
    return {
        type: RECEIVE_NOTIFICATION_DETAIL,
        notification
    }
}

export const clearNotificationListAction = (): NotificationActionTypes => {
    return {
        type: CLEAR_NOTIFICATION_LIST,
    }
}

export const clearNotificationDetailAction = (): NotificationActionTypes => {
    return {
        type: CLEAR_NOTIFICATION_DETAIL
    }
}

