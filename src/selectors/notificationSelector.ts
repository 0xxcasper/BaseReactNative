import {
    AllState,
    NotificationStateType
} from "types/reducerStateTypes";

const selectNotificationState = (state: AllState): NotificationStateType => {
    return state.notificationState;
};