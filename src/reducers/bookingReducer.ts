import { Map } from 'immutable';
import { BookingActionTypes, CLEAR_BOOKING_EDITOR, ErrorBookingServiceAction, ErrorBookingStaffListAction, ErrorBookingTaskListAction, ERROR_BOOKING_SERVICE_LIST, ERROR_BOOKING_STAFF_LIST, ERROR_BOOKING_TASK_LIST, RequestMakeBookingErrorAction, REQUEST_BOOKING_SERVICE_LIST, REQUEST_BOOKING_STAFF_LIST, REQUEST_BOOKING_TASK_LIST, REQUEST_MAKE_BOOKING, REQUEST_MAKE_BOOKING_ERROR, REQUEST_MAKE_BOOKING_OK, UpdateBookingEditorAction, UpdateBookingServiceAction, UpdateBookingStaffListAction, UpdateBookingTaskListAction, UPDATE_BOOKING_EDITOR, UPDATE_BOOKING_SERVICE_LIST, UPDATE_BOOKING_STAFF_LIST, UPDATE_BOOKING_TASK_LIST } from "../actionTypes/bookingActionTypes";
import { BookingEditor, BookingService, BookingStaff, BookingTask } from "../types/modelTypes";
import { BookingStateType } from "../types/reducerStateTypes";


export const _emptyBookingEditor: BookingEditor = {
    carId: '',
    odo: undefined,
    carTaker: undefined,
    isMe: undefined,
    phoneNumber: undefined,
    dealerLocationId: undefined,
    bookingStaffId: undefined,
    appointmentTime: undefined,
    bookingTaskId: undefined,
    bookingServiceTypeId: undefined,
    note: undefined,
}
const _initState: BookingStateType = {
    bookingEditor: _emptyBookingEditor,
    bookingEditorDataStatus: null,
    bookingStaffMap: Map<string, BookingStaff>(),
    bookingStaffDataStatus: null,
    bookingTaskMap: Map<string, BookingTask>(),
    bookingTaskDataStatus: null,
    bookingServiceMap: Map<string, BookingService>(),
    bookingServiceDataStatus: null,
};
const _updateBookingEditor = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as UpdateBookingEditorAction;
    const {
        bookingEditor
    } = _action;
    if (bookingEditor) {
        let {
            bookingEditor: _currentBookingEditor
        } = state;
        state = {
            ...state,
            bookingEditor: {
                ..._currentBookingEditor,
                ...bookingEditor
            }
        }
    }
    return state;
};
const _updateBookingStaffs = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as UpdateBookingStaffListAction;
    const {
        consultants
    } = _action;
    if (consultants && consultants.length > 0) {
        let {
            bookingStaffMap
        } = state;
        consultants.forEach((_staffInfo: BookingStaff) => {
            bookingStaffMap = bookingStaffMap.set(_staffInfo.id, _staffInfo);
        });
        state = {
            ...state,
            bookingStaffMap,
            bookingStaffDataStatus: {
                action: action.type,
                updateTime: Date.now(),
            }
        }
    }
    return state;
};
const _errorBookingStaffs = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as ErrorBookingStaffListAction;
    return {
        ...state,
        bookingStaffDataStatus: {
            action: _action.type,
            error: _action.error,
        }
    }
};
const _updateBookingServiceTypes = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as UpdateBookingServiceAction;
    const {
        bookingServiceTypes
    } = _action;
    if (bookingServiceTypes && bookingServiceTypes.length > 0) {
        let {
            bookingServiceMap
        } = state;
        bookingServiceTypes.forEach((_bookingServiceInfo: BookingService) => {
            bookingServiceMap = bookingServiceMap.set(_bookingServiceInfo.id, _bookingServiceInfo);
        });
        state = {
            ...state,
            bookingServiceMap: bookingServiceMap,
            bookingServiceDataStatus: {
                action: action.type,
                updateTime: Date.now(),
            }
        }
    }
    return state;
};

const _errorBookingServiceTypes = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as ErrorBookingServiceAction;
    return {
        ...state,
        bookingServiceDataStatus: {
            action: _action.type,
            error: _action.error,
        }
    }
};

const _updateBookingTasks = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as UpdateBookingTaskListAction;
    const {
        bookingTasks
    } = _action;
    if (bookingTasks && bookingTasks.length > 0) {
        let {
            bookingTaskMap
        } = state;
        bookingTasks.forEach((_bookingTask: BookingTask) => {
            bookingTaskMap = bookingTaskMap.set(_bookingTask.id, _bookingTask);
        });
        state = {
            ...state,
            bookingTaskMap,
            bookingTaskDataStatus: {
                action: action.type,
                updateTime: Date.now(),
            }
        }
    }
    return state;
};

const _errorBookingTasks = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as ErrorBookingTaskListAction;
    return {
        ...state,
        bookingTaskDataStatus: {
            action: _action.type,
            error: _action.error,
        }
    }
};
const _errorRequestMakeBooking = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    const _action = action as RequestMakeBookingErrorAction;
    return {
        ...state,
        bookingEditorDataStatus: {
            action: _action.type,
            error: _action.error,
        }
    }
};

const _clearBookingEditor = (state: BookingStateType, action: BookingActionTypes): BookingStateType => {
    console.log('clearBookingEditor');
    return {
        ...state,
        bookingEditor: _emptyBookingEditor
    };
};

export default (state = _initState, action: BookingActionTypes): BookingStateType => {
    switch (action.type) {
        case UPDATE_BOOKING_EDITOR:
            console.log('_carEditor test 0');
            return _updateBookingEditor(state, action);
        case CLEAR_BOOKING_EDITOR:
            console.log('_carEditor test 1');
            return _clearBookingEditor(state, action);
        case UPDATE_BOOKING_STAFF_LIST:
            return _updateBookingStaffs(state, action);
        case REQUEST_BOOKING_STAFF_LIST:
            return {
                ...state,
                bookingStaffDataStatus: {
                    action: action.type,
                }
            };
        case ERROR_BOOKING_STAFF_LIST:
            return _errorBookingStaffs(state, action);
        case UPDATE_BOOKING_SERVICE_LIST:
            return _updateBookingServiceTypes(state, action);
        case REQUEST_BOOKING_SERVICE_LIST:
            return {
                ...state,
                bookingServiceDataStatus: {
                    action: action.type,
                }
            };
        case ERROR_BOOKING_SERVICE_LIST:
            return _errorBookingServiceTypes(state, action);
        case UPDATE_BOOKING_TASK_LIST:
            return _updateBookingTasks(state, action);
        case REQUEST_BOOKING_TASK_LIST:
            return {
                ...state,
                bookingTaskDataStatus: {
                    action: action.type,
                }
            };
        case ERROR_BOOKING_TASK_LIST:
            return _errorBookingTasks(state, action);
        case REQUEST_MAKE_BOOKING:
        case REQUEST_MAKE_BOOKING_OK:
            return {
                ...state,
                bookingEditorDataStatus: {
                    action: action.type,
                }
            };
        case REQUEST_MAKE_BOOKING_ERROR:
            return _errorRequestMakeBooking(state, action);
    }
    return state;
}
export const bookingStateToJs = (state: BookingStateType): any => {
    const {
        bookingEditor,
        bookingStaffMap,
        bookingTaskMap,
        bookingServiceMap,
    } = state;
    return {
        bookingEditor,
        bookingStaffMap: bookingStaffMap.toObject(),
        bookingTaskMap: bookingTaskMap.toObject(),
        bookingServiceMap: bookingServiceMap.toObject(),
    }
};
export const bookingStateFromJs = (state: any): BookingStateType => {
    const {
        bookingEditor,
        bookingStaffMap,
        bookingTaskMap,
        bookingServiceMap
    } = state;
    return {
        ..._initState,
        bookingStaffMap: Map<string, BookingStaff>(bookingStaffMap),
        bookingTaskMap: Map<string, BookingTask>(bookingTaskMap),
        bookingServiceMap: Map<string, BookingService>(bookingServiceMap),
    }
};
