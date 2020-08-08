import { capitalize } from './../helpers';
import { ChatUserModel, Supporter } from './../types/modelTypes';
import { selectAccountUpdate, selectChatUser } from './../selectors/accountSelectors';
import { useSelector } from "react-redux";
import { selectAccountState } from "../selectors/accountSelectors";
import { PointLog, AccountUpdateModel } from '../types/modelTypes';
import { Map } from 'immutable';
import { sortCollections } from "../helpers";

export const useAccountInfo = () => {
    return useSelector(selectAccountState);
};
export const useAccountQrCode = (): string | null | undefined => {
    return useAccountInfo()?.qrCode;
};

export const useAccountPointLogs = (): PointLog[] | null | undefined => {
    const _accountInfo = useSelector(selectAccountState);
    if (!_accountInfo || !_accountInfo.pointLogs || _accountInfo.pointLogs.size === 0) {
        return null
    }
    return _accountInfo.pointLogs.toIndexedSeq().toArray()
};
export const useAccountFullName = (): string | null | undefined => {
    return capitalize(useAccountInfo()?.fullName);
}
export const useAccountAvatar = (): string | null | undefined => {
    return useAccountInfo()?.avatar;
}
export const useAccountUpdate = (): AccountUpdateModel | null | undefined => {
    return useSelector(selectAccountUpdate);
}

export const useAccountChatUser = (): ChatUserModel | null | undefined => {
    return useSelector(selectChatUser);
}

export const useAccountChatSupporterName = (): string | null | undefined => {
    return useAccountChatUser()?.supporter.name
}

export const useAccountChatUserToken = (): string | null | undefined => {
    return useAccountChatUser()?.token
}

export const useAccountChatUserId = (): string | null | undefined => {
    return useAccountChatUser()?.id
}

export const useAccountChatSupporter = (): Supporter | null | undefined => {
    return useAccountChatUser()?.supporter
}

export const useAccountChatSupporterId = (): string | null | undefined => {
    return useAccountChatSupporter()?.id
}

export const useAccountPoint = (): number | null | undefined => {
    return useAccountInfo()?.point
}