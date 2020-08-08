import { all, put, takeLatest } from 'redux-saga/effects';
import {getCalendarListApi} from "../network";
import {receiveCalendarList} from "../actions/calendarActions";
import {REQUEST_CALENDAR_LIST} from "../actionTypes/calendarActionTypes";


function* _requestCalendarList(actions: any) {
    const {resolve, reject} = actions
    try {
        const _calendars = yield getCalendarListApi()
        if (_calendars) {
            yield put(receiveCalendarList(_calendars))
        }
        resolve && resolve(_calendars)
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        })
    }
}

function* watchCalendarList() {
    yield takeLatest(REQUEST_CALENDAR_LIST, _requestCalendarList)
}


export default function*() {
    yield all([watchCalendarList()])
}