import {CBErrorType} from "../types/errors";

const PREFIX = 'CALENDAR/';
export const REQUEST_CALENDAR_LIST = PREFIX + 'REQUEST_CALENDAR_LIST';
export const RECEIVE_CALENDAR_LIST = PREFIX + 'RECEIVE_CALENDAR_LIST';

export interface RequestCalendarListAction {
    type: typeof REQUEST_CALENDAR_LIST,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface ReceiveCalendarListAction {
    type: typeof RECEIVE_CALENDAR_LIST,
    calendars: []
}

export type CalendarActionTypes = RequestCalendarListAction | ReceiveCalendarListAction