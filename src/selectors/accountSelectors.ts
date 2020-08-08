import { AccountUpdateModel, ChatUserModel } from './../types/modelTypes';
import {AccountStateType, AllState} from "../types/reducerStateTypes";

export const selectAccountState = (state: AllState): AccountStateType => {
    return state?.accountState;
};
export const selectAccountQrCode = (state: AllState): string | null | undefined => {
    return selectAccountState(state)?.qrCode;
};

export const selectAccountLevel = (state: AllState): string | null | undefined => {
    return selectAccountState(state)?.level;
};

export const selectAccountUpdate = (state: AllState): AccountUpdateModel | undefined => {
    return selectAccountState(state)?.accountUpdate;
};

export const selectAccountFullName = (state: AllState): string | null | undefined => {
    return selectAccountState(state)?.fullName;
};

export const selectChatUser = (state: AllState): ChatUserModel | null | undefined => {
    return selectAccountState(state)?.chatUser;
};

export const selectChatUserToken = (state: AllState): string | null | undefined => {
    return selectChatUser(state)?.token;
};

export const selectChatUserId = (state: AllState): string | null | undefined => {
    return selectChatUser(state)?.id;
};