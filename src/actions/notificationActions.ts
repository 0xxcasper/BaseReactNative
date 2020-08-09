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

/*
* Call if you want get all list notification
* Example: tap to button BELL => go to notification screen
* */
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

/*
* Receive list notification
* */
export const receiveNotificationListAction = (listNotify: Notification[]): NotificationActionTypes => {
    return {
        type: RECEIVE_NOTIFICATION_LIST,
        listNotify
    }
}

/*
* Get detail a notification
* */
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

/*
* Get Detail notification success
* */
export const receiveNotificationDetailAction = (notification: Notification[]): NotificationActionTypes => {
    return {
        type: RECEIVE_NOTIFICATION_DETAIL,
        notification
    }
}

/*
* If user in notification screen and tap back
* call this action clear all notification list
* when you go to notification screen again
* call requestNotificationDetailAction
* */
export const clearNotificationListAction = (): NotificationActionTypes => {
    return {
        type: CLEAR_NOTIFICATION_LIST,
    }
}

/*
* If you want clear notification Detail Model
* call this action
* */
export const clearNotificationDetailAction = (): NotificationActionTypes => {
    return {
        type: CLEAR_NOTIFICATION_DETAIL
    }
}

