import { Map } from 'immutable';
import { Notification } from "../types/modelTypes";
import { AllState, NotificationStateType } from "../types/reducerStateTypes";

const selectNotificationState = (state: AllState): NotificationStateType => {
    return state.notificationState;
};

export const selectNotifications = (state: AllState): Map<number, Notification> | null | undefined => {
    return selectNotificationState(state).notificationMap;
};

export const selectNotificationDetail = (state: AllState): Notification | null | undefined => {
    return selectNotificationState(state).notificationDetail;
};