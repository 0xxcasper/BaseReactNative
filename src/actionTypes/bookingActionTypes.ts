import { CBErrorType } from "../types/errors";
import { BookingEditor, BookingService, BookingStaff, BookingTask } from "../types/modelTypes";

const PREFIX                                    = 'BOOKING_ACTION/';
export const CLEAR_BOOKING_EDITOR               = PREFIX + 'CLEAR_BOOKING_EDITOR';
export const UPDATE_BOOKING_EDITOR              = PREFIX + 'UPDATE_BOOKING_EDITOR';
export const REQUEST_BOOKING_STAFF_LIST         = PREFIX + 'REQUEST_BOOKING_STAFF_LIST';
export const ERROR_BOOKING_STAFF_LIST           = PREFIX + 'ERROR_BOOKING_STAFF_LIST';
export const UPDATE_BOOKING_STAFF_LIST          = PREFIX + 'UPDATE_BOOKING_STAFF_LIST';
export const REQUEST_BOOKING_SERVICE_LIST       = PREFIX + 'REQUEST_BOOKING_SERVICE_LIST';
export const ERROR_BOOKING_SERVICE_LIST         = PREFIX + 'ERROR_BOOKING_SERVICE_LIST';
export const UPDATE_BOOKING_SERVICE_LIST        = PREFIX + 'UPDATE_BOOKING_SERVICE_LIST';
export const REQUEST_BOOKING_TASK_LIST          = PREFIX + 'REQUEST_BOOKING_TASK_LIST';
export const ERROR_BOOKING_TASK_LIST            = PREFIX + 'ERROR_BOOKING_TASK_LIST';
export const UPDATE_BOOKING_TASK_LIST           = PREFIX + 'UPDATE_BOOKING_TASK_LIST';
export const REQUEST_MAKE_BOOKING               = PREFIX + 'REQUEST_MAKE_BOOKING';
export const REQUEST_MAKE_BOOKING_OK            = PREFIX + 'REQUEST_MAKE_BOOKING_OK';
export const REQUEST_MAKE_BOOKING_ERROR         = PREFIX + 'REQUEST_MAKE_BOOKING_ERROR';

export interface UpdateBookingEditorAction {
    type: typeof UPDATE_BOOKING_EDITOR,
    bookingEditor: BookingEditor
}
export interface ClearBookingEditorAction {
    type: typeof CLEAR_BOOKING_EDITOR,
}

export interface UpdateBookingStaffListAction {
    type: typeof UPDATE_BOOKING_STAFF_LIST,
    consultants: BookingStaff[] | null
}

export interface ErrorBookingStaffListAction {
    type: typeof ERROR_BOOKING_STAFF_LIST,
    error?: CBErrorType
}


export interface UpdateBookingServiceAction {
    type: typeof UPDATE_BOOKING_SERVICE_LIST,
    bookingServiceTypes: BookingService[] | null
}

export interface ErrorBookingServiceAction {
    type: typeof ERROR_BOOKING_SERVICE_LIST,
    error?: CBErrorType
}

export interface UpdateBookingTaskListAction {
    type: typeof UPDATE_BOOKING_TASK_LIST,
    bookingTasks: BookingTask[] | null
}

export interface ErrorBookingTaskListAction {
    type: typeof ERROR_BOOKING_TASK_LIST,
    error?: CBErrorType
}

export interface RequestMakeBookingAction {
    type: typeof REQUEST_MAKE_BOOKING,
    resolve?: (result?: any | null | undefined) => void,
    reject?: (error?: CBErrorType | null | undefined) => void,
}

export type BookingActionTypes =
    UpdateBookingEditorAction
    | UpdateBookingStaffListAction
    | ErrorBookingStaffListAction
    | UpdateBookingServiceAction
    | ErrorBookingServiceAction
    | UpdateBookingTaskListAction
    | ErrorBookingTaskListAction
    | RequestMakeBookingAction
