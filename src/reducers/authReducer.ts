import { UPDATE_STATE_DID_SHOW_INTRODUCE } from './../actionTypes/authActionTypes';
import {
    AUTH_ERROR,
    AUTH_OK,
    AuthActionTypes,
    AuthErrorAction,
    AuthOkAction,
    CANCEL_AUTH,
    CHANGE_AUTH_OTP,
    CHANGE_AUTH_PHONE_NUMBER,
    CHANGE_AUTH_USER_NAME,
    ChangeAuthOtpAction,
    ChangeAuthPhoneNumberAction,
    ChangeAuthUserNameAction,
    CLEAR_AUTH_OTP,
    ClearAuthOtpAction,
    DELETE_AUTH_OTP,
    DeleteAuthOtpAction,
    SUBMIT_OTP,
    LOGOUT_SUCCESS
} from "../actionTypes/authActionTypes";
import { _TEST_ACCOUNT_INDEX, _TEST_ACCOUNTS } from "../common/config";
import { AuthStateType } from "../types/reducerStateTypes";
import { refreshToken } from "../network";

const _initState: AuthStateType = {
    authenticated: false,
    token: null,
    phoneNumber: null,
    otp: '',
    userName: '',
    status: null,
    refreshToken: null,
    didShowIntroduce: false
};

function _changeAuthPhoneNumber(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action: ChangeAuthPhoneNumberAction = action as ChangeAuthPhoneNumberAction;
    const {
        phoneNumber
    } = _action;
    return {
        ...state,
        status: null,
        phoneNumber
    };
}

function _changeAuthOtp(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action: ChangeAuthOtpAction = action as ChangeAuthOtpAction;
    const {
        otp
    } = _action;
    return {
        ...state,
        status: null,
        otp: `${otp}`.trim()
    };
}

function _deleteAuthOtp(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _: DeleteAuthOtpAction = action as DeleteAuthOtpAction;
    return {
        ...state,
        status: null,
        otp: (state.otp && state.otp.length > 0) ? state.otp.slice(0, -1) : ''
    };
}

function _clearAuthOtp(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _: ClearAuthOtpAction = action as ClearAuthOtpAction;
    return {
        ...state,
        status: null,
        otp: ''
    };
}

function _changeAuthUserName(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action: ChangeAuthUserNameAction = action as ChangeAuthUserNameAction;
    const {
        userName
    } = _action;
    return {
        ...state,
        status: null,
        userName
    };
}

function _authOk(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action = action as AuthOkAction;

    const { firebaseDocId, accessToken, refreshToken } = _action.result

    return {
        ...state,
        authenticated: true,
        firebaseDocId,
        token: accessToken,
        refreshToken,
        status: {
            action: action.type
        }
    };
}

function _authError(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action = action as AuthErrorAction;
    return {
        ...state,
        status: {
            action: _action.type,
            error: _action.error
        }
    }
}

function _logoutSuccess(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action = action as AuthOkAction;
    return {
        ...state,
        authenticated: false,
        firebaseDocId: null,
        token: null,
        refreshToken: null,
        phoneNumber: '',
        otp: '',
        userName: null,
        status: {
            action: action.type
        }
    };
}

function _updateDidShowIntroduce(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    return {
        ...state,
        didShowIntroduce: true
    };
}

export default function (state = _initState, action: AuthActionTypes): AuthStateType {
    switch (action.type) {
        case CHANGE_AUTH_PHONE_NUMBER:
            return _changeAuthPhoneNumber(state, action);
        case CHANGE_AUTH_OTP:
            return _changeAuthOtp(state, action);
        case DELETE_AUTH_OTP:
            return _deleteAuthOtp(state, action);
        case CLEAR_AUTH_OTP:
            return _clearAuthOtp(state, action);
        case CHANGE_AUTH_USER_NAME:
            return _changeAuthUserName(state, action);
        case AUTH_ERROR:
            return _authError(state, action);
        case CANCEL_AUTH:
        case SUBMIT_OTP:
        case AUTH_OK:
            return _authOk(state, action);
        case LOGOUT_SUCCESS:
            return _logoutSuccess(state, action);
        case UPDATE_STATE_DID_SHOW_INTRODUCE:
            return _updateDidShowIntroduce(state, action);
    }
    return state;
}

export function authToJs(state: AuthStateType) {
    const {
        authenticated,
        phoneNumber,
        token,
        firebaseDocId,
        didShowIntroduce
    } = state;

    return {
        phoneNumber,
        token,
        authenticated,
        firebaseDocId,
        didShowIntroduce
    };
}

export function authFromJs(state: AuthStateType) {
    const {
        phoneNumber,
        token, //Note access Token
        authenticated,
        firebaseDocId,
        refreshToken,
        didShowIntroduce
    } = state

    return {
        ..._initState,
        ...state,
        firebaseDocId,
        authenticated,
        phoneNumber,
        token,
        refreshToken,
        didShowIntroduce
    };
}
