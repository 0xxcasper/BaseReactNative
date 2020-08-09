import {
    AUTH_ERROR,
    AUTH_OK,
    AuthActionTypes,
    AuthErrorAction,
    AuthOkAction,
} from "actionTypes/authActionTypes";

import { AuthStateType } from "types/reducerStateTypes";

const _initState: AuthStateType = {
};

function _authOk(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action = action as AuthOkAction;
    return {
        ...state,
    };
}

function _authError(state: AuthStateType, action: AuthActionTypes): AuthStateType {
    const _action = action as AuthErrorAction;
    return {
        ...state,
    }
}

export default function (state = _initState, action: AuthActionTypes): AuthStateType {
    switch (action.type) {
        case AUTH_ERROR:
            return _authError(state, action);
        case AUTH_OK:
            return _authOk(state, action);
    }
    return state;
}

export function authToJs(state: AuthStateType) {
    const {} = state;
    return {};
}

export function authFromJs(state: AuthStateType) {
    const {} = state

    return {
        ..._initState,
        ...state,
    };
}
