import { setAppNotificationBadge } from './../actions/appActions';
import { Notification } from './../types/modelTypes';
import { all, put, select, takeLatest } from 'redux-saga/effects';
import {
    requestNotificationDetailLogin,
    requestNotificationDetailUnLogin,
    requestNotificationLogin,
    requestNotificationUnLogin,
    requestSetMarkNotificationUnLogin,
    requestSetMarkNotificationLogin
} from "network/index";
import { receiveNotification, receiveNotificationDetail } from './../actions/notificationActions';
import { REQUEST_NOTIFICATION, REQUEST_NOTIFICATION_DETAIL, REQUEST_NOTIFICATION_MARK_READ } from './../actionTypes/notificationActionTypes';
import { isBlank, sortCollections } from 'Helpers';
import { selectEmailAnonymousToken } from 'selectors/appSelectors';
import { selectFirebaseDocId, selectIsAuthenticated } from 'selectors/authSelectors';
import { createAction } from '../actions';
import moment from "moment"
function* _requestNotification(action: any) {
    const {
        resolve,
        reject
    } = action
    try {
        const _currentEmailAnonymous = yield select(selectEmailAnonymousToken);
        const _firebaseDocId = yield select(selectFirebaseDocId);
        const _isAuthenticated = yield select(selectIsAuthenticated) && !isBlank(_firebaseDocId);
        let _result = null
        if (!_isAuthenticated && _currentEmailAnonymous) {
            _result = yield requestNotificationUnLogin(_currentEmailAnonymous);
        } else {
            _result = yield requestNotificationLogin()
        }
        resolve && resolve();
        const _data: Notification[] = _result.data || null
        if (_data && _data.length > 0) {
            let numberNotification = 0;
            let _notifyList: any[] = []
            _data.forEach((item: Notification) => {
                if (!item.read) {
                    numberNotification += 1
                }
                _notifyList.push({
                    ...item,
                    createTimeMs: moment(item.createdAt, "DD-MM-YYYY HH:mm:ss").toDate().getTime()
                })
            })
            yield put(setAppNotificationBadge(numberNotification))
            yield put(receiveNotification(_notifyList))
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestNotificationDetail(action: any) {
    const {
        resolve,
        reject
    } = action
    try {
        const { notificationId } = action
        const _currentEmailAnonymous = yield select(selectEmailAnonymousToken);
        const _firebaseDocId = yield select(selectFirebaseDocId);
        const _isAuthenticated = yield select(selectIsAuthenticated) && !isBlank(_firebaseDocId);
        let _result: Notification
        if (!_isAuthenticated && _currentEmailAnonymous) {
            _result = yield requestNotificationDetailUnLogin(notificationId.toString(), _currentEmailAnonymous);
        } else {
            _result = yield requestNotificationDetailLogin(notificationId.toString())
        }
        resolve && resolve()
        if (_result) {
            yield put(receiveNotificationDetail(_result))
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestNotificationMarkRead(action: any) {
    try {
        const { notificationId } = action
        const _currentEmailAnonymous = yield select(selectEmailAnonymousToken);
        const _firebaseDocId = yield select(selectFirebaseDocId);
        const _isAuthenticated = yield select(selectIsAuthenticated) && !isBlank(_firebaseDocId);
        let _result = null
        if (!_isAuthenticated && _currentEmailAnonymous) {
            _result = yield requestSetMarkNotificationUnLogin(notificationId.toString(), _currentEmailAnonymous);
        } else {
            _result = yield requestSetMarkNotificationLogin(notificationId.toString())
        }
        if (_result) {
            yield put(createAction(REQUEST_NOTIFICATION))
        }
    } catch (e) {

    }
}

function* watchNotificationList() {
    yield takeLatest(REQUEST_NOTIFICATION, _requestNotification);
}

function* watchNotificationDetail() {
    yield takeLatest(REQUEST_NOTIFICATION_DETAIL, _requestNotificationDetail);
}

function* watchNotificationMarkRead() {
    yield takeLatest(REQUEST_NOTIFICATION_MARK_READ, _requestNotificationMarkRead);
}


export default function* () {
    yield all([watchNotificationList(), watchNotificationDetail(), watchNotificationMarkRead()]);
}
