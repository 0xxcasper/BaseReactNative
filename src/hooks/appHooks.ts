import { selectCurrentAppState } from 'selectors/appSelectors';
import { useSelector } from "react-redux";
import {
    selectAppBadge,
    selectAppLoading
} from 'selectors/appSelectors';

export const useAppNumberBadge = () => {
    return useSelector(selectAppBadge);
}

export const useAppLoading = () => {
    return useSelector(selectAppLoading);
}
export const useCurrentAppState = () => {
    return useSelector(selectCurrentAppState);
}