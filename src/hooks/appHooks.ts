import { selectCurrentAppState } from './../selectors/appSelectors';
import { useSelector } from "react-redux";
import { selectFcmToken, selectAppBadge, selectAppLoading } from '../selectors/appSelectors';

export const useFcmToken = () => {
    return useSelector(selectFcmToken);
}

export const useAppNumberBadge = () => {
    return useSelector(selectAppBadge);
}

export const useAppLoading = () => {
    return useSelector(selectAppLoading);
}
export const useCurrentAppState = () => {
    return useSelector(selectCurrentAppState);
}