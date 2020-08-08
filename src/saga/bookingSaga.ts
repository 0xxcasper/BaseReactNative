import { refactorPrefixPhoneNumber } from './../helpers';
import { Map } from 'immutable';
import moment from 'moment';
import { all, put, select, take, takeLatest } from 'redux-saga/effects';
import { createAction } from "../actions";
import { updateBookingServices as updateBookingServicesAction, updateBookingStaffList as updateServiceConsultantsAction, updateBookingTasks as updateBookingTasksAction } from "../actions/bookingActions";
import { ERROR_BOOKING_SERVICE_LIST, ERROR_BOOKING_STAFF_LIST, ERROR_BOOKING_TASK_LIST, REQUEST_BOOKING_SERVICE_LIST, REQUEST_BOOKING_STAFF_LIST, REQUEST_BOOKING_TASK_LIST, REQUEST_MAKE_BOOKING, REQUEST_MAKE_BOOKING_OK, UPDATE_BOOKING_SERVICE_LIST, UPDATE_BOOKING_STAFF_LIST, UPDATE_BOOKING_TASK_LIST } from "../actionTypes/bookingActionTypes";
import { BookingServiceBuilder, BookingStaffBuilder, BookingTaskBuilder } from "../builders";
import { getBookingServiceTypesApi, getBookingTaskApi, getServiceConsultantsApi, makeBooking as makeBookingApi } from "../network";
import { selectFcmToken } from "../selectors/appSelectors";
import { BookingService, BookingStaff, BookingTask } from "../types/modelTypes";
import { selectAccountState } from './../selectors/accountSelectors';
import { selectBookingEditor } from './../selectors/bookingSelectors';
import { BookingEditor } from './../types/modelTypes';
import { delay } from "./index";

enum CAR_BOOKING_KEY {
    KM_NUMBER = 'km_number',
    RELATED_FULL_NAME = 'related_fullname',
    PHONE = 'phone',
    OWNER_FULL_NAME = 'owner_fullname',
    STAFF_ID = 'staff_id',
    BOOKING_TIME = 'booking_time',
    TASK_ID = 'task_id',
    SERVICE_TYPE_ID  = 'service_type_id',
    REMARK = 'remark',
    LICENSE_PLATE = 'license_plate',
    LOCATION_ID = 'id'
}

function* requestBookingStaffs() {
    const token = yield select(selectFcmToken);
    try {
        const _result: BookingStaff[] = (yield getServiceConsultantsApi(token) || []).map((_bookingStaff: any): BookingStaff => {
            return BookingStaffBuilder.fromApiData(_bookingStaff);
        });
        yield put(updateServiceConsultantsAction(_result));
    } catch (e) {
        yield put(createAction(ERROR_BOOKING_STAFF_LIST, {
            error: e
        }));
    }
}


function* watchBookingStaffListAction() {
    while (true) {
        yield take(REQUEST_BOOKING_STAFF_LIST);
        yield requestBookingStaffs();
        const { type } = yield take([UPDATE_BOOKING_STAFF_LIST, ERROR_BOOKING_STAFF_LIST]);
        if (type === UPDATE_BOOKING_STAFF_LIST) {
            break;
        } else {
            yield delay(30000);
        }
    }
}

function* requestBookingTasks() {
    const token = yield select(selectFcmToken);
    try {
        const _result: BookingTask[] = (yield getBookingTaskApi(token) || []).map((_bookingTask: any, _index: number): BookingStaff => {
            return BookingTaskBuilder.fromApiData(_bookingTask);
        });
        yield put(updateBookingTasksAction(_result));
    } catch (e) {
        yield put(createAction(ERROR_BOOKING_TASK_LIST, {
            error: e
        }));
    }
}


function* watchBookingTaskListAction() {
    while (true) {
        yield take(REQUEST_BOOKING_TASK_LIST);
        yield requestBookingTasks();
        const { type } = yield take([UPDATE_BOOKING_TASK_LIST, ERROR_BOOKING_TASK_LIST]);
        if (type === UPDATE_BOOKING_TASK_LIST) {
            break;
        } else {
            yield delay(30000);
        }
    }
}

function* requestBookingServiceTypes() {
    const token = yield select(selectFcmToken);
    try {
        const _result: BookingService[] = (yield getBookingServiceTypesApi(token) || []).map((_booking: any, _index: number): BookingService => {
            return {
                ...BookingServiceBuilder.fromApiData(_booking),
                sortValue: _index
            }
        });
        yield put(updateBookingServicesAction(_result));
    } catch (e) {
        yield put(createAction(ERROR_BOOKING_SERVICE_LIST, {
            error: e
        }));
    }
}

function* watchBookingServiceListAction() {
    while (true) {
        yield take(REQUEST_BOOKING_SERVICE_LIST);
        yield requestBookingServiceTypes();
        const { type } = yield take([UPDATE_BOOKING_SERVICE_LIST, ERROR_BOOKING_SERVICE_LIST]);
        if (type === UPDATE_BOOKING_SERVICE_LIST) {
            break;
        } else {
            yield delay(30000);
        }
    }
}

function* requestMakeBooking(action: any) {
    const {
        resolve,
        reject
    } = action

    const _useBookingEditor: BookingEditor = yield select(selectBookingEditor)
    const _useUserInfo = yield select(selectAccountState)
    if (_useBookingEditor && _useUserInfo) {
        var carEditor = Map<string, any>()
        if (_useBookingEditor.odo) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.KM_NUMBER, _useBookingEditor.odo)
        }
        if (_useBookingEditor.isMe) {
            if (_useUserInfo.fullName) {
                carEditor = carEditor.set(CAR_BOOKING_KEY.RELATED_FULL_NAME, _useUserInfo.fullName)
            }
            if (_useUserInfo.phone && _useUserInfo.phone.value) {
                carEditor = carEditor.set(CAR_BOOKING_KEY.PHONE, refactorPrefixPhoneNumber(_useUserInfo.phone.value))
            }
        } else {
            if (_useBookingEditor.carTaker) {
                carEditor = carEditor.set(CAR_BOOKING_KEY.RELATED_FULL_NAME, _useBookingEditor.carTaker)
            }
            if (_useBookingEditor.phoneNumber) {
                carEditor = carEditor.set(CAR_BOOKING_KEY.PHONE, refactorPrefixPhoneNumber(_useBookingEditor.phoneNumber))
            }
        }
        if (_useUserInfo.fullName) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.OWNER_FULL_NAME, _useUserInfo.fullName)
        }
        if (_useBookingEditor.bookingStaffId) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.STAFF_ID, _useBookingEditor.bookingStaffId)
        }
        if (_useBookingEditor.appointmentTime) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.BOOKING_TIME, moment(_useBookingEditor.appointmentTime).format('YYYY/MM/DD HH:mm:ss'))
        }
        if (_useBookingEditor.bookingTaskId) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.TASK_ID, _useBookingEditor.bookingTaskId)
        }
        if (_useBookingEditor.bookingServiceTypeId) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.SERVICE_TYPE_ID, _useBookingEditor.bookingServiceTypeId)
        }
        if (_useBookingEditor.note) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.REMARK, _useBookingEditor.note)
        }
        if (_useBookingEditor.plate) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.LICENSE_PLATE, _useBookingEditor.plate)
        }
        if (_useBookingEditor.dealerLocationId) {
            carEditor = carEditor.set(CAR_BOOKING_KEY.LOCATION_ID, _useBookingEditor.dealerLocationId)
        }
        if (carEditor) {
            try {
                const _result = yield makeBookingApi(carEditor.toObject())
                resolve && resolve(_result);
                yield put(createAction(REQUEST_MAKE_BOOKING_OK));
            } catch (error) {
                const { errors } = error
                if (errors) {
                    let message: string[] = []
                    const _errors: string[][] = Object.values(errors)
                    _errors.forEach((item: string[]) => {
                        message.push(item[0])
                    })
                    reject && reject({
                        code: error?.code,
                        message: message.join('\n')
                    });
                    return
                }
                reject && reject({
                    code: error?.code,
                    message: error?.message
                });
            }
        }
    }
}

function* watchMakeBookingAction() {
    yield takeLatest(REQUEST_MAKE_BOOKING, requestMakeBooking)
}

export default function* () {
    yield all([watchBookingStaffListAction(), watchBookingTaskListAction(), watchBookingServiceListAction(), watchMakeBookingAction()]);
}
