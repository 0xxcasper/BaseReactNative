import {CBErrorType} from "types/errors";
import {AuthResult} from "types/modelTypes";

const PREFIX                    = 'AUTH_ACTION/';
export const REQUEST_LOGIN      = PREFIX + 'REQUEST_LOGIN';
export const AUTH_OK            = PREFIX + 'AUTH_OK';
export const AUTH_ERROR         = PREFIX + 'AUTH_ERROR';
export const REQUEST_LOGOUT     = PREFIX + 'REQUEST_LOGOUT';
export const CLEAR_AUTH_STORAGE = PREFIX + 'CLEAR_AUTH_STORAGE';

export interface RequestLoginAction {
    type: typeof REQUEST_LOGIN,
    params: any | null | undefined
}

export interface AuthErrorAction {
    type: typeof AUTH_ERROR,
    error: CBErrorType,
}

export interface AuthOkAction {
    type: typeof AUTH_OK,
    result: AuthResult,
}

export interface RequestLogoutAction {
    type: typeof REQUEST_LOGOUT,
    params: any | null | undefined
}

export interface ClearAuthStorageAction {
    type: typeof CLEAR_AUTH_STORAGE
}

export type AuthActionTypes =
    RequestLoginAction
    | AuthErrorAction
    | AuthOkAction
    | RequestLogoutAction
    | ClearAuthStorageAction;