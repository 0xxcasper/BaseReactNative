import { CLEAR_ACCOUNT_INFO, ClearAccountInfoAction, UPDATE_ACCOUNT_UPDATE, UpdateAccountUpdate, FETCH_USER_INFO, UPDATE_CHAT_USER, UpdateChatUser } from './../actionTypes/accountActionTypes';
import { AccountStateType } from "../types/reducerStateTypes";
import { AccountActionTypes, UPDATE_ACCOUNT_INFO, UpdateAccountInfoAction } from "../actionTypes/accountActionTypes";
import { PointLog, AccountUpdateModel } from '../types/modelTypes';
import { Map } from 'immutable'
import moment from "moment";

const _initAccountUpdate: AccountUpdateModel = {
    fullName: null,
    phone: null,
    email: null,
    passPort: null,
    gender: null,
    address: null,
    birthday: null,
}

const _initAccountInfo: AccountStateType = {
    avatar: undefined,
    birthday: undefined,
    email: undefined,
    phone: undefined,
    fullName: undefined,
    gender: undefined,
    createdTimeMs: undefined,
    level: undefined,
    levelId: undefined,
    qrCode: undefined,
    pointLogs: undefined,
    passportId: undefined,
    address: undefined,
    accountUpdate: _initAccountUpdate,
    chatUser: undefined
}
const _initState: AccountStateType = {
    ..._initAccountInfo
};
const _updateAccountInfo = (state: AccountStateType, action: AccountActionTypes): AccountStateType => {
    const _action = action as UpdateAccountInfoAction;
    const {
        accountInfo
    } = _action;
    if (accountInfo) {
        state = {
            ...state,
            ...accountInfo
        }
    }
    return state;
};

const _clearAccountInfo = (state: AccountStateType, action: AccountActionTypes): AccountStateType => {
    state = {
        ...state,
        ..._initAccountInfo
    }
    return state;
};

const _updateAccountUpdate = (state: AccountStateType, action: AccountActionTypes): AccountStateType => {
    const _action = action as UpdateAccountUpdate
    const {
        accountUpdate
    } = _action
    state = {
        ...state,
        accountUpdate
    }
    return state;
};

const _fetchUserInfo = (state: AccountStateType, action: AccountActionTypes): AccountStateType => {
    const {
        birthday,
        email,
        phone,
        fullName,
        gender,
        passportId,
        address
    } = state

    return {
        ...state,
        accountUpdate: {
            birthday: birthday ? moment(birthday, "DD/MM/YYYY").toDate().getTime() : null,
            fullName,
            gender,
            phone: phone?.value,
            email: email?.email,
            passPort: passportId,
            address: address,
        }
    };
};

const _updateChatUser = (state: AccountStateType, action: AccountActionTypes): AccountStateType => {
    const _action = action as UpdateChatUser
    const {
        chatUser
    } = _action
    return {
        ...state,
        chatUser
    };
};

export default (state: AccountStateType = _initState, action: AccountActionTypes): AccountStateType => {
    switch (action.type) {
        case UPDATE_ACCOUNT_INFO:
            return _updateAccountInfo(state, action);
        case CLEAR_ACCOUNT_INFO:
            return _clearAccountInfo(state, action);
        case UPDATE_ACCOUNT_UPDATE:
            return _updateAccountUpdate(state, action);
        case FETCH_USER_INFO:
            return _fetchUserInfo(state, action);
        case UPDATE_CHAT_USER:
            return _updateChatUser(state, action);
    }
    return state;
}
export const accountStateToJs = (state: AccountStateType): any => {
    const {
        avatar,
        birthday,
        email,
        fullName,
        gender,
        phone,
        createdTimeMs,
        level,
        levelId,
        qrCode,
        accountUpdate,
        chatUser,
        passportId,
        address,
    } = state;
    return {
        avatar,
        birthday,
        email,
        phone,
        fullName,
        gender,
        createdTimeMs,
        level,
        levelId,
        qrCode,
        accountUpdate,
        chatUser,
        passportId,
        address,
    }
};
export const accountStateFromJs = (state: any): AccountStateType => {
    const {
        avatar,
        birthday,
        email,
        phone,
        fullName,
        gender,
        createdTimeMs,
        level,
        levelId,
        qrCode,
        chatUser,
        passportId,
        address,
    } = state;
    return {
        ..._initState,
        avatar,
        birthday,
        email,
        phone,
        fullName,
        gender,
        createdTimeMs,
        level,
        levelId,
        qrCode,
        accountUpdate: _initAccountUpdate,
        chatUser,
        passportId,
        address,
    }
};
