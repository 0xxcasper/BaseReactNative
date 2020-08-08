import {useDispatch, useSelector} from "react-redux";
import {
    selectBookingEditor,
    selectBookingEditorDataStatus,
    selectBookingServiceLastUpdateTime,
    selectBookingServiceMap,
    selectBookingStaffMap,
    selectBookingStaffUpdateTime,
    selectBookingTaskLastUpdateTime,
    selectBookingTaskMap
} from "../selectors/bookingSelectors";
import {Map} from "immutable";
import {BookingStaff} from "../types/modelTypes";
import {TIME_DAY} from "../common/const";
import {
    REQUEST_BOOKING_SERVICE_LIST,
    REQUEST_BOOKING_STAFF_LIST,
    REQUEST_BOOKING_TASK_LIST
} from "../actionTypes/bookingActionTypes";
import {useMemo} from "react";
import {filterSearch} from "../helpers";
import {createAction} from "../actions";
import {DataStatus} from "../types/reducerStateTypes";

export const useBookingEditor = () => {
    return useSelector(selectBookingEditor);
};

export const useBookingStaffMap = (): Map<string, BookingStaff> | null | undefined => {
    const dispatch = useDispatch();
    const _result = useSelector(selectBookingStaffMap);
    const _updateTime = useSelector(selectBookingStaffUpdateTime);
    if (!_result || _result.size === 0 || (Date.now() - _updateTime) > TIME_DAY) {
        dispatch(createAction(REQUEST_BOOKING_STAFF_LIST));
    }
    return _result;
};
export const useBookingStaffSearch = (searchText: string | null | undefined): BookingStaff[] | null => {
    const _serviceConsultantMap = useBookingStaffMap();
    if (_serviceConsultantMap) {
        return useMemo(() => {
            return filterSearch(_serviceConsultantMap.toIndexedSeq().toArray(), 'name', searchText);
        }, [searchText, _serviceConsultantMap]);
    }
    return null;
};
export const useBookingStaffName = (bookingStaffId: string | null | undefined): string | null | undefined => {
    const _dataMap = useBookingStaffMap();
    if (_dataMap && bookingStaffId) {
        return _dataMap.get(bookingStaffId)?.name;
    }
    return null;
};

export const useBookingTaskMap = (): Map<string, BookingStaff> | null | undefined => {
    const dispatch = useDispatch();
    const _result = useSelector(selectBookingTaskMap);
    const _updateTime = useSelector(selectBookingTaskLastUpdateTime);
    if (!_result || _result.size === 0 || (Date.now() - _updateTime) > TIME_DAY) {
        dispatch(createAction(REQUEST_BOOKING_TASK_LIST));
    }
    return _result;
};

export const useBookingTaskName = (bookingTaskId: string | null | undefined): string | null | undefined => {
    return useBookingTaskMap()?.get(bookingTaskId || '')?.name;
};

export const useBookingServiceMap = (): Map<string, BookingStaff> | null | undefined => {
    const dispatch = useDispatch();
    const _result = useSelector(selectBookingServiceMap);
    const _updateTime = useSelector(selectBookingServiceLastUpdateTime);
    if (!_result || _result.size === 0 || (Date.now() - _updateTime) > TIME_DAY) {
        dispatch(createAction(REQUEST_BOOKING_SERVICE_LIST));
    }
    return _result;
};
export const useBookingServiceTypeName = (bookingServiceType: string | null | undefined): string | null | undefined => {
    return useBookingServiceMap()?.get(bookingServiceType || '')?.name;
};
export const useBookingEditorDataStatus = (): DataStatus | null | undefined => {
    return useSelector(selectBookingEditorDataStatus);
}
