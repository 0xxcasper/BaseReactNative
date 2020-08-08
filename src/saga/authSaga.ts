import {all, put, select, take, takeLatest} from 'redux-saga/effects';
import {createAction} from "../actions";
import {updateAccountInfo as updateAccountInfoAction} from "../actions/accountActions";
import {authOk as authOkAction, getUserProfile as getUserProfileAction, logoutSuccess} from "../actions/authActions";
import {requestNotification as requestNotificationAction} from "../actions/notificationActions";
import {REQUEST_ACCOUNT_INFO} from "actionTypes/accountActionTypes";
import {
    REQUEST_AUTH,
    REQUEST_AUTH_OTP,
    REQUEST_CHECK_OTP,
    REQUEST_GET_USER_PROFILE,
    REQUEST_LOGOUT,
    REQUEST_REGISTER_PHONE_NUMBER,
    REQUEST_UPDATE_USER_NAME,
    SUBMIT_OTP
} from "actionTypes/authActionTypes";
import labels from '../i18n/labels';
import titles from '../i18n/titles';
import {
    checkOtp as checkOtpAPI,
    getUserProfile as getUserProfileAPI,
    loginApi,
    logoutApi,
    registerPhoneNumber as registerPhoneNumberApi,
    updateProfileFullName as updateProfileFullNameAPI
} from "../network/index";
import {AccountStateType} from "types/reducerStateTypes";
import {clearAccountInfo} from 'actions/accountActions';
import {isBlank} from 'helpers';
import {selectFcmToken} from 'selectors/appSelectors';
import {CLEAR_CONVERSATION_LOGOUT} from "actionTypes/chatActionTypes";

function* loginWithPhoneNumber(action: any) {
    const {
        phoneNumber,
        platform,
        resolve,
        reject
    } = action
    try {
        const _token = yield select(selectFcmToken)
        if (_token) {
            const _result = yield loginApi(phoneNumber, _token, platform);
            const _data = _result.data
            const { meta, data } = _result
            const { access_token, refresh_token } = meta.token
            if (data) {
                yield put(getUserProfileAction(null, () => { }, () => { }))
                yield put(authOkAction({
                    firebaseDocId: data.firebase_doc,
                    accessToken: access_token || null,
                    refreshToken: refresh_token || null
                }));
            }
            yield put(requestNotificationAction(() => { }, () => { }))
            yield put(createAction(REQUEST_ACCOUNT_INFO));
            resolve && resolve(labels.login_success, !isBlank(data.fullname))
        }
    } catch (error) {
        console.log('Login Error: ', error);
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}
/*
* when logout success
* remove conversations + local storage has message
* remove account info
* */
function* logout(action: any) {
    const {
        fcmToken,
        platform,
        resolve,
        reject
    } = action
    try {
        const _result = yield logoutApi(fcmToken, platform)
        const { message } = _result
        yield put(logoutSuccess());
        yield put(createAction(CLEAR_CONVERSATION_LOGOUT))
        yield put(requestNotificationAction(() => { }, () => { }))
        yield put(clearAccountInfo())
        resolve && resolve(message || titles.logout_success);
        console.log('Logout Result: ', _result);
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
        console.log('Logout Error: ', error);
    }
}

function* registerPhoneNumber(action: any) {
    
    const {
        phoneNumber,
        resolve,
        reject
    } = action
    console.log('Register', phoneNumber);
    try {
        if (phoneNumber) {
            const _result = yield registerPhoneNumberApi(phoneNumber)
            const { message } = _result
            if (message) {
                resolve && resolve(message || '');
            }
            console.log('Register Phone Number: ', _result);
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
        console.log('Logout Error: ', error);
    }
}

function* checkOTP(action: any) {
    const {
        otp,
        phoneNumber,
        platform,
        resolve,
        reject
    } = action
    try {
        const _token = yield select(selectFcmToken)
        if (_token) {
            const _result = yield checkOtpAPI(phoneNumber, otp, _token, platform)
            const { message } = _result
            if (message) {
                resolve && resolve(message);
            }
            console.log('Check OTP Success: ', _result);
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
        console.log('Check OTP Fail: ', error);
    }
}

function* updateUserName(action: any) {
    const {
        userName,
        resolve,
        reject
    } = action
    try {
        if (userName) {
            const _result = yield updateProfileFullNameAPI(userName)
            const { message } = _result
            if (message) {
                yield put(getUserProfileAction(null, () => { }, () => { }))
                resolve && resolve(message);
            }
        }
    } catch (error) {
        reject && reject({
            code: error?.code,
            message: error?.message
        });
    }
}


function* getUserProfile(action: any) {
    const {
        params,
        resolve,
        reject
    } = action
    try {
        const _result = yield getUserProfileAPI(params)
        if (params && _result) {
            resolve && resolve(_result.message);
            return;
        }
        let _createAt = Date.now()
        const { create_at, email } = _result
        if (create_at) {
            _createAt = new Date(_createAt).getTime()
        }
        const _accountInfo: AccountStateType = {
            avatar: _result.avatar,
            fullName: _result.fullname || '',
            birthday: _result.birthday,
            email: {
                active: email.active,
                email: email.update ? email.update : email.value
            },
            gender: _result.gender || '',
            createdTimeMs: _createAt,
            phone: _result.phone,
            passportId: _result.passport_id,
            address: _result.address,
        };
        yield put(updateAccountInfoAction(_accountInfo));
        const { message } = _result
        if (message) {
            resolve && resolve(message);
        }
        if (_result) {
            resolve && resolve();
        }
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

function* watchRegisterPhoneNumberFlow() {
    yield takeLatest(REQUEST_REGISTER_PHONE_NUMBER, registerPhoneNumber);
}

function* watchCheckOTPFlow() {
    yield takeLatest(REQUEST_CHECK_OTP, checkOTP);
}

function* watchLoginWithPhoneNumberFlow() {
    yield takeLatest(REQUEST_AUTH, loginWithPhoneNumber);
}

function* watchLogoutFlow() {
    yield takeLatest(REQUEST_LOGOUT, logout);
}

function* watchLoginFlow() {
    while (true) {
        yield take(REQUEST_AUTH_OTP);
        yield take(SUBMIT_OTP);
    }
}

function* watchUpdateUserNameFlow() {
    yield takeLatest(REQUEST_UPDATE_USER_NAME, updateUserName);
}

function* watchGetUserProfileFlow() {
    yield takeLatest(REQUEST_GET_USER_PROFILE, getUserProfile);
}

export default function* () {
    yield all([
        watchLoginFlow(),
        watchLoginWithPhoneNumberFlow(),
        watchLogoutFlow(),
        watchRegisterPhoneNumberFlow(),
        watchCheckOTPFlow(),
        watchUpdateUserNameFlow(),
        watchGetUserProfileFlow()
    ]);
}
