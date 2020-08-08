import {
    CalendarActionTypes,
    RECEIVE_CALENDAR_LIST,
    ReceiveCalendarListAction
} from "../actionTypes/calendarActionTypes";


const _initState: {calendars: []} = {
    calendars: []
}

export default (state = _initState, actions: CalendarActionTypes) => {
    switch (actions.type) {
        case RECEIVE_CALENDAR_LIST:
            const _actions = actions as ReceiveCalendarListAction
            return {
                ...state,
                calendars: _actions.calendars
            }
    }
    return state
}