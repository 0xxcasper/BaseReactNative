import { CBErrorType } from 'types/errors';
import { LogoutAction, LogoutSuccessAction, REQUEST_REGISTER_PHONE_NUMBER, REQUEST_CHECK_OTP, REQUEST_UPDATE_USER_NAME, UPDATE_USER_NAME_OK, REQUEST_GET_USER_PROFILE } from 'actionTypes/authActionTypes';
import {
    AUTH_OK,
    AuthActionTypes,
    AuthOkAction,
    CHANGE_AUTH_OTP,
    CHANGE_AUTH_PHONE_NUMBER,
    CHANGE_AUTH_USER_NAME,
    CLEAR_AUTH_OTP,
    DELETE_AUTH_OTP,
    LoginWithPhoneAction,
    REQUEST_AUTH,
    REQUEST_AUTH_OTP,
    SUBMIT_OTP,
    REQUEST_LOGOUT,
    LOGOUT_SUCCESS
} from "actionTypes/authActionTypes";
import { AuthResult } from "types/modelTypes";

export function loginWithPhoneNumber(
    phoneNumber: string,
    platform: string,
    resolve: (message: string, isHaveFullName: boolean) => void,
    reject: (error?: CBErrorType | null | undefined) => void
): LoginWithPhoneAction {
    return {
        type: REQUEST_AUTH,
        phoneNumber,
        platform: platform,
        resolve,
        reject,
    }
}

export function logout(platform: string, fcmToken: string, resolve: (message: string) => void, reject: (error?: CBErrorType | null | undefined) => void): LogoutAction {
    return {
        type: REQUEST_LOGOUT,
        platform: platform,
        fcmToken: fcmToken,
        resolve,
        reject,
    }
}

export function logoutSuccess(): LogoutSuccessAction {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export function authOk(result: AuthResult): AuthOkAction {
    return {
        type: AUTH_OK,
        result: result
    }
}

export function changeAuthPhoneNumber(phoneNumber: string | null | undefined): AuthActionTypes {
    return {
        type: CHANGE_AUTH_PHONE_NUMBER,
        phoneNumber: phoneNumber
    }
}

export function changeAuthOtp(otp: string | null | undefined): AuthActionTypes {
    return {
        type: CHANGE_AUTH_OTP,
        otp: otp
    }
}

export function deleteAuthOtp(): AuthActionTypes {
    return {
        type: DELETE_AUTH_OTP,
    }
}

export function clearAuthOtp(): AuthActionTypes {
    return {
        type: CLEAR_AUTH_OTP,
    }
}

export function changeAuthUserName(userName: string | null | undefined): AuthActionTypes {
    return {
        type: CHANGE_AUTH_USER_NAME,
        userName: userName
    }
}

export function requestAuthOtp(): AuthActionTypes {
    return {
        type: REQUEST_AUTH_OTP
    }
}

export function submitAuthOtp(): AuthActionTypes {
    return {
        type: SUBMIT_OTP
    }
}

export function requestRegisterPhoneNumber(phoneNumber: string, resolve: (message: string) => void, reject: (error?: CBErrorType | null | undefined) => void): AuthActionTypes {
    return {
        type: REQUEST_REGISTER_PHONE_NUMBER,
        phoneNumber: phoneNumber,
        resolve,
        reject,
    }
}

export function requestCheckOTP(otp: string, phoneNumber: string, platform: string, resolve: (message: string) => void, reject: (error?: CBErrorType | null | undefined) => void): AuthActionTypes {
    return {
        type: REQUEST_CHECK_OTP,
        otp,
        phoneNumber,
        platform,
        resolve,
        reject,
    }
}

export function requestUpdateUserName(userName: string, resolve: (message: string) => void, reject: (error?: CBErrorType | null | undefined) => void): AuthActionTypes {
    return {
        type: REQUEST_UPDATE_USER_NAME,
        userName,
        resolve,
        reject,
    }
}

export function updateUserNameOK(userName: string): AuthActionTypes {
    return {
        type: UPDATE_USER_NAME_OK,
        userName,
    }
}

export function getUserProfile(params: any | null | undefined, resolve: () => void, reject: (error?: CBErrorType | null | undefined) => void): AuthActionTypes {
    return {
        type: REQUEST_GET_USER_PROFILE,
        params,
        resolve,
        reject,
    }
}