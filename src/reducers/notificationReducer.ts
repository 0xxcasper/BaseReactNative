import { sortCollections } from './../helpers';
import { useDispatch } from 'react-redux';
import { Map } from 'immutable';
import { NotificationActionTypes, REQUEST_GET_SCREEN_NOTIFICATION, CLEAR_LIST_NOTIFY } from '../actionTypes/notificationActionTypes';
import {
    ReceiveNotificationAction,
    RECEIVE_NOTIFICATION,
    RECEIVE_NOTIFICATION_DETAIL,
    ReceiveNotificationDetailAction,
    RESET_NOTIFICATION_DETAIL,
    ResetNotificationDetailAction
} from './../actionTypes/notificationActionTypes';
import { Notification } from './../types/modelTypes';
import { NotificationStateType } from './../types/reducerStateTypes';

const _initState: NotificationStateType = {
    notificationMap: Map<number, Notification>(),
    notificationDetail: null
};

const _updateNotification = (state: NotificationStateType, action: NotificationActionTypes): NotificationStateType => {

    const _action = action as ReceiveNotificationAction;

    const {
        notification
    } = _action;

    if (notification) {
        let _notificationMap = Map<number, Notification>()
        notification.forEach((item: Notification) => {
            _notificationMap = _notificationMap.set(item.id, item);
        })
        state = {
            ...state,
            notificationMap: _notificationMap,
        }
    }
    return state;
};

const _updateNotificationDetail = (state: NotificationStateType, action: NotificationActionTypes): NotificationStateType => {
    const _action = action as ReceiveNotificationDetailAction;
    const {
        notification
    } = _action;

    if (notification) {
        state = {
            ...state,
            notificationDetail: notification,
        }
    }
    return state;
};

const _resetNotificationDetail = (state: NotificationStateType, action: NotificationActionTypes): NotificationStateType => {
    return {
        ...state,
        notificationDetail: null,
    }
};

const _clearNotifyList = (state: NotificationStateType, action: NotificationActionTypes): NotificationStateType => {
    return {
        ...state,
        notificationDetail: null,
        notificationMap: Map<number, Notification>(),
    }
}

export default (state = _initState, action: NotificationActionTypes): NotificationStateType => {
    switch (action.type) {
        case RECEIVE_NOTIFICATION:
            return _updateNotification(state, action);
        case RECEIVE_NOTIFICATION_DETAIL:
            return _updateNotificationDetail(state, action);
        case RESET_NOTIFICATION_DETAIL:
            return _resetNotificationDetail(state, action);
        case CLEAR_LIST_NOTIFY:
            return _clearNotifyList(state, action);
        default:
    }
    return state;
}
