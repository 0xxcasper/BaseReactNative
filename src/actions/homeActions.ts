import {
    HomeActionTypes, RECEIVE_HOME_BANNER,
    REQUEST_HOME_BANNER
} from 'actionTypes/homeActionTypes';
import {CBErrorType} from "types/errors";
import {HomeBannerModel} from "types/modelTypes";

export const requestHomeBannerAction = (
    resolve?: () => void,
    reject?: (error?: CBErrorType | null | undefined) => void): HomeActionTypes => {
    return {
        type: REQUEST_HOME_BANNER,
        resolve,
        reject
    }
};

export const receiveHomeBannerAction = (banners: HomeBannerModel[]) => {
    return {
        type: RECEIVE_HOME_BANNER,
        banners
    }
}