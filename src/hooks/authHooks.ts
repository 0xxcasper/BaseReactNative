import { useSelector } from "react-redux";
import _const from 'common/const';
import {
    selectAuthError,
    selectAuthOtp,
    selectAuthPhoneNumber,
    selectAuthStatusAction,
    selectAuthUserName,
    selectFirebaseDocId,
    selectIsAuthenticated
} from "selectors/authSelectors";
import { CBErrorType } from "types/errors";
import { isBlank } from 'Helpers';
import { selectAccountLevel } from 'selectors/accountSelectors';
import { selectDidShowIntroduce } from 'selectors/authSelectors';

export const useAuthPhoneNumber = (): string | null | undefined => {
    return useSelector(selectAuthPhoneNumber);
};
export const useAuthOtp = (): string | null | undefined => {
    return useSelector(selectAuthOtp);
};
export const useAuthUserName = (): string | null | undefined => {
    return useSelector(selectAuthUserName);
};
export const useAuthStatusAction = (): string | null | undefined => {
    return useSelector(selectAuthStatusAction);
};
export const useAuthError = (): CBErrorType | null | undefined => {
    return useSelector(selectAuthError);
};
export const useIsAuthenticated = (): boolean => {
    const _firebaseDocId = useSelector(selectFirebaseDocId);
    return useSelector(selectIsAuthenticated) && !isBlank(_firebaseDocId);
};
export const useIsMemberShip = (): boolean => {
    const _firebaseDocId = useSelector(selectFirebaseDocId);
    const _isAuthenticated = useSelector(selectIsAuthenticated) && !isBlank(_firebaseDocId);
    const _level = useSelector(selectAccountLevel)
    return !!(_isAuthenticated && _level && _level.toUpperCase() !== _const.NO_RANK.toUpperCase());

};
export const useDidShowIntroduce = (): boolean => {
    return useSelector(selectDidShowIntroduce)
};
