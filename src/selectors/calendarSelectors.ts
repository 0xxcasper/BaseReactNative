import {AllState} from "../types/reducerStateTypes";


export const selectCalendarState = (state: AllState) => {
    return state.calendarState
}

export const selectCalendars = (state: AllState) => {
    return selectCalendarState(state)?.calendars
}