import {AllState, BookingStateType, DataStatus} from "../types/reducerStateTypes";
import {BookingEditor, BookingService, BookingStaff, BookingTask} from "../types/modelTypes";
import {Map} from "immutable";

const selectBookingState = (state: AllState): BookingStateType => {
    return state?.bookingState;
};
export const selectBookingEditor = (state: AllState): BookingEditor => {
    return selectBookingState(state)?.bookingEditor;
};
export const selectBookingEditorDataStatus = (state: AllState): DataStatus | null | undefined => {
    return selectBookingState(state)?.bookingEditorDataStatus;
};
export const selectBookingStaffMap = (state: AllState): Map<string, BookingStaff> | null | undefined => {
    return selectBookingState(state)?.bookingStaffMap;
};
export const selectBookingStaffUpdateTime = (state: AllState): number => {
    return selectBookingState(state)?.bookingStaffDataStatus?.updateTime || 0;
};

export const selectBookingServiceMap = (state: AllState): Map<string, BookingService> | null | undefined => {
    return selectBookingState(state)?.bookingServiceMap;
};
export const selectBookingServiceLastUpdateTime = (state: AllState): number => {
    return selectBookingState(state)?.bookingServiceDataStatus?.updateTime || 0;
};

export const selectBookingTaskMap = (state: AllState): Map<string, BookingTask> | null | undefined => {
    return selectBookingState(state)?.bookingTaskMap;
};
export const selectBookingTaskLastUpdateTime = (state: AllState): number => {
    return selectBookingState(state)?.bookingTaskDataStatus?.updateTime || 0;
};


