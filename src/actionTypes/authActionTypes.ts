import {CBErrorType} from "../types/errors";
import {AuthResult} from "../types/modelTypes";

const PREFIX = 'AUTH_ACTION/';
export const CHANGE_AUTH_PHONE_NUMBER = PREFIX + 'CHANGE_AUTH_PHONE_NUMBER';
export const CHANGE_AUTH_OTP = PREFIX + 'CHANGE_AUTH_OTP';
export const DELETE_AUTH_OTP = PREFIX + 'DELETE_AUTH_OTP';
export const CLEAR_AUTH_OTP = PREFIX + 'CLEAR_AUTH_OTP';
export const CANCEL_AUTH = PREFIX + 'CANCEL_AUTH';
export const REQUEST_AUTH_OTP = PREFIX + 'WAITING_OTP';
export const SUBMIT_OTP = PREFIX + 'SUBMIT_OTP';
export const CHANGE_AUTH_USER_NAME = PREFIX + 'CHANGE_AUTH_USERNAME';
export const AUTH_ERROR = PREFIX + 'AUTH_ERROR';
export const AUTH_OK = PREFIX + 'AUTH_OK';
export const API_TOKEN_ERROR = PREFIX + 'API_TOKEN_ERROR';
export const REQUEST_AUTH = PREFIX + 'REQUEST_AUTH';
export const REQUEST_LOGOUT = PREFIX + 'REQUEST_LOGOUT';
export const LOGOUT_SUCCESS = PREFIX + 'LOGOUT_SUCCESS';
export const REQUEST_REGISTER_PHONE_NUMBER = PREFIX + 'REQUEST_REGISTER_PHONE_NUMBER';
export const REQUEST_CHECK_OTP = PREFIX + 'REQUEST_CHECK_OTP';
export const REQUEST_UPDATE_USER_NAME = PREFIX + 'REQUEST_UPDATE_USER_NAME';
export const UPDATE_USER_NAME_OK = PREFIX + 'UPDATE_USER_NAME_OK';
export const REQUEST_GET_USER_PROFILE = PREFIX + 'REQUEST_GET_USER_PROFILE';
export const UPDATE_STATE_DID_SHOW_INTRODUCE = PREFIX + 'UPDATE_STATE_DID_SHOW_INTRODUCE';

export interface LoginWithPhoneAction {
    type: typeof REQUEST_AUTH,
    phoneNumber: string,
    platform: string,
    resolve: (message: string, isHaveFullName: boolean) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface LogoutAction {
    type: typeof REQUEST_LOGOUT,
    platform: string,
    fcmToken: string,
    resolve: (message: string) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS,
}

export interface ChangeAuthPhoneNumberAction {
    type: typeof CHANGE_AUTH_PHONE_NUMBER,
    phoneNumber?: string | null | undefined
}

export interface ChangeAuthOtpAction {
    type: typeof CHANGE_AUTH_OTP,
    otp?: string | null | undefined
}

export interface DeleteAuthOtpAction {
    type: typeof DELETE_AUTH_OTP,
}

export interface ClearAuthOtpAction {
    type: typeof CLEAR_AUTH_OTP,
}

export interface ChangeAuthUserNameAction {
    type: typeof CHANGE_AUTH_USER_NAME,
    userName?: string | null | undefined
}

export interface RequestAuthOtpAction {
    type: typeof REQUEST_AUTH_OTP,
}

export interface SubmitAuthOtpAction {
    type: typeof SUBMIT_OTP,
}

export interface AuthErrorAction {
    type: typeof AUTH_ERROR,
    error: CBErrorType,
}

export interface AuthOkAction {
    type: typeof AUTH_OK,
    result: AuthResult,
}

export interface RequestRegisterPhoneNumber {
    type: typeof REQUEST_REGISTER_PHONE_NUMBER,
    phoneNumber: number,
    resolve: (message: string) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface RequestCheckOTP {
    type: typeof REQUEST_CHECK_OTP,
    otp: number
    phoneNumber: number,
    platform: string,
    resolve: (message: string) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface RequestUpdateUserName {
    type: typeof REQUEST_UPDATE_USER_NAME,
    userName: string
    resolve: (message: string) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface UpdateUserNameOK {
    type: typeof UPDATE_USER_NAME_OK,
    userName: string
}


export interface RequestGetUserProfile {
    type: typeof REQUEST_GET_USER_PROFILE,
    params: any | null | undefined,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export type AuthActionTypes =
    ChangeAuthPhoneNumberAction
    | ChangeAuthOtpAction
    | DeleteAuthOtpAction
    | ClearAuthOtpAction
    | RequestAuthOtpAction
    | ChangeAuthUserNameAction
    | SubmitAuthOtpAction
    | AuthErrorAction
    | AuthOkAction
    | LogoutAction
    | LogoutSuccessAction
    | RequestRegisterPhoneNumber
    | RequestCheckOTP
    | RequestUpdateUserName
    | UpdateUserNameOK
    | RequestGetUserProfile;
