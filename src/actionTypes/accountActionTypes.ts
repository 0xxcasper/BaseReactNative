import {AccountStateType} from "types/reducerStateTypes";

const PREFIX = 'ACCOUNT_ACTION/';
export const REQUEST_ACCOUNT_INFO           = PREFIX + 'REQUEST_ACCOUNT_INFO';
export const UPDATE_ACCOUNT_INFO            = PREFIX + 'UPDATE_ACCOUNT_INFO';
export const CLEAR_ACCOUNT_INFO             = PREFIX + 'CLEAR_ACCOUNT_INFO';

export interface RequestAccountInfoAction {
    type: typeof REQUEST_ACCOUNT_INFO,
    optional: any | null | undefined
}

export interface UpdateAccountInfoAction {
    type: typeof UPDATE_ACCOUNT_INFO,
    accountInfo: AccountStateType
}

export interface ClearAccountInfoAction {
    type: typeof CLEAR_ACCOUNT_INFO,
}

export type AccountActionTypes =
    UpdateAccountInfoAction
    | ClearAccountInfoAction
    | RequestAccountInfoAction;
