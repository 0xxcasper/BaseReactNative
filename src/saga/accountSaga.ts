import { REQUEST_UPDATE_AVATAR, REQUEST_UPDATE_PHONE_NUMBER } from './../actionTypes/accountActionTypes';
import { Map } from 'immutable';
import moment from "moment";
// import firebase from "react-native-firebase";
import fireStore from '@react-native-firebase/firestore';
import { eventChannel } from 'redux-saga';
import { all, put, select, take, takeEvery, takeLatest, call } from 'redux-saga/effects';
import { updateAccountInfo as updateAccountInfoAction } from "../actions/accountActions";
import { REQUEST_ACCOUNT_INFO, REQUEST_JOIN_MEMBERSHIP_API } from "../actionTypes/accountActionTypes";
import { KEY_FILTER_HISTORY_SERVICE, SERVICE_HISTORY, FIRE_BASE_MEMBER } from "../common/const";
import { selectFirebaseDocId } from "../selectors/authSelectors";
import { PointLog } from './../types/modelTypes';
import { requestJoinMembershipApi, updateAvatar, updateProfilePhoneNumberApi } from "../network/index";
import { createAction } from '../actions';
import { getUserProfile } from "../actions/authActions";
function* getAccountInfoFromFirebaseStore() {
    try {
        const _firebaseDocId =   yield select(selectFirebaseDocId);

        /**
         * Return when null | undefine
         */
        if(!_firebaseDocId) return;
        /**End */

        /**
        * Snapshot real time event 
        */
        const docReference  =   fireStore()
                                    .collection(SERVICE_HISTORY)
                                    .doc(_firebaseDocId);
        const channel       =   eventChannel(emit => {
                                    return docReference.onSnapshot(emit)
                                })

        /**
         * Catch Snapshot
         */
        while (true) {
            const data = yield take(channel)
            const _member = data.get(FIRE_BASE_MEMBER);
            console.log('FireBase Data', _member);
            if (_member) {
                const {
                    createdAt,
                    level,
                    levelId,
                    point,
                    pointLogs,
                    qrCode,
                } = _member;
                let _pointLogs  =  Map<number, PointLog>()
                if (pointLogs && pointLogs.length > 0) {
                    pointLogs.forEach((value: any) => {
                        value.createdTimeMs     =   moment(value[KEY_FILTER_HISTORY_SERVICE], "DD/MM/YYYY hh:mm").toDate().getTime()
                        _pointLogs              =   _pointLogs.set(value.id, value)
                    });
                }
                yield put(updateAccountInfoAction({
                    qrCode: qrCode,
                    levelId,
                    level,
                    point,
                    createdTimeMs: createdAt ? moment(createdAt, "MM-DD-YYYY HH:mm:ss").toDate().getTime() : undefined,
                    pointLogs: _pointLogs,
                }))
            }
        }
    } catch (e) {
    }
}

function* requestJoinMembership(action: any) {
    const {
        resolve,
        reject
    } = action
    try {
        const _result = yield requestJoinMembershipApi()
        yield put(createAction(REQUEST_ACCOUNT_INFO))
        if (_result) {
            resolve && resolve()
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* requestUpdateAvatar(action: any) {
    const {
        base64,
        resolve,
        reject
    } = action
    try {
        const _result = yield updateAvatar(base64)
        yield put(getUserProfile(null,
            () => {
                resolve && resolve()
            }, (error) => {
                reject && reject(error);
            }))
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}

function* _requestUpdatePhoneNumber(action: any) {
    const {
        phoneNumber
    } = action
    try {
        const _result = yield updateProfilePhoneNumberApi(phoneNumber)
    } catch (error) {
    }
}

function* watchAccountInfoAction() {
    yield takeEvery(REQUEST_ACCOUNT_INFO, getAccountInfoFromFirebaseStore)
}

function* watchJoinMembership() {
    yield takeLatest(REQUEST_JOIN_MEMBERSHIP_API, requestJoinMembership)
}

function* watchUpdateAvatar() {
    yield takeLatest(REQUEST_UPDATE_AVATAR, requestUpdateAvatar)
}


function* watchUpdatePhoneNumber() {
    yield takeLatest(REQUEST_UPDATE_PHONE_NUMBER, _requestUpdatePhoneNumber);
}

export default function* () {
    yield all([
        watchAccountInfoAction(),
        watchJoinMembership(),
        watchUpdateAvatar(),
        watchUpdatePhoneNumber()
    ]);
}
