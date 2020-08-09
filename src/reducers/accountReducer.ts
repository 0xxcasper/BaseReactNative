import {AccountStateType} from "types/reducerStateTypes";
import {AccountActionTypes} from "actionTypes/accountActionTypes";

const _initAccountInfo: AccountStateType = {}

const _initState: AccountStateType = {
    ..._initAccountInfo
};

export default (state: AccountStateType = _initState, action: AccountActionTypes): AccountStateType => {
    switch (action.type) {
    }
    return state;
}
export const accountStateToJs = (state: AccountStateType): any => {
    const {} = state;
    return {}
};
export const accountStateFromJs = (state: any): AccountStateType => {
    const {} = state;
    return {
        ..._initState,
    }
};
