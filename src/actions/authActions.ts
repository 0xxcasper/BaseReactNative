import {
    AuthActionTypes,
    AUTH_OK,
    REQUEST_LOGIN,
    AUTH_ERROR,
    REQUEST_LOGOUT, CLEAR_AUTH_STORAGE,
} from 'actionTypes/authActionTypes';
import {AuthResult} from "types/modelTypes";
import {CBErrorType} from "types/errors";

/*
* Login action here
* params: { phoneNumber | email | deviceToken}
* */
export const requestLoginAction = (params: any | null | undefined): AuthActionTypes => {
    return {
        type: REQUEST_LOGIN,
        params
    }
}

/* Login success storage accessToken | refreshToken */
export const authOkAction = (result: AuthResult): AuthActionTypes => {
    return {
        type: AUTH_OK,
        result: result
    }
}

/* Handle event login fail */
export const authErrorAction = (error: CBErrorType): AuthActionTypes => {
    return {
        type: AUTH_ERROR,
        error
    }
}

/* Request Logout action*/
export const requestLogoutAction = (params: any | null | undefined): AuthActionTypes => {
    return {
        type: REQUEST_LOGOUT,
        params
    }
}

/*
* When logout success this action
* Clear auth storage accessToken | refreshToken | fireBaseDocId
* */
export const clearAuthStorageAction = (): AuthActionTypes => {
    return {
        type: CLEAR_AUTH_STORAGE,
    }
}

