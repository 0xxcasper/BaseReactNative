import {
    AccountActionTypes,
    CLEAR_ACCOUNT_INFO,
    REQUEST_ACCOUNT_INFO,
    UPDATE_ACCOUNT_INFO
} from 'actionTypes/accountActionTypes';
import {AccountStateType} from "types/reducerStateTypes";

/*
* request Get Account Info
* call when login success | user open app
* */
export const requestGetAccountInfoAction = (optional: any | null | undefined): AccountActionTypes => {
    /*
    * optional: { isLoading }
    */
    return {
        type: REQUEST_ACCOUNT_INFO,
        optional
    }
};

/*
* When login success call this action
* update your client account info,
* this data need to clear when user logout
* */
export const updateAccountInfoAction = (accountInfo: AccountStateType): AccountActionTypes => {
    return {
        type: UPDATE_ACCOUNT_INFO,
        accountInfo: accountInfo
    }
};


/*
* When logout success need to clear user
* account info
* */
export const clearAccountInfoAction = (): AccountActionTypes => {
    return {
        type: CLEAR_ACCOUNT_INFO
    }
}

