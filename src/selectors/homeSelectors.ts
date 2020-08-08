import { ContactDealerModel } from './../types/modelTypes';
import {AllState, HomeStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import {HomeBanner, News, NewsPage, YouTube} from "../types/modelTypes";

const selectHomeState = (state: AllState): HomeStateType => {
    return state.homeState;
};
export const selectBannerMap = (state: AllState): Map<string, HomeBanner> | null | undefined => {
    return selectHomeState(state)?.banner?.bannerMap;
};
export const selectBannerInterval = (state: AllState): number => {
    return selectHomeState(state)?.banner?.interval;
};
export const selectPopupMap = (state: AllState): Map<string, HomeBanner> | null | undefined => {
    return selectHomeState(state)?.popup?.popupMap;
};
export const selectPopupInterval = (state: AllState): number => {
    return selectHomeState(state)?.popup?.interval;
};
export const selectPopupLastShowTime = (state: AllState): number => {
    return selectHomeState(state)?.popup?.lastShowTime;
};
export const selectNewsPageMap = (state: AllState): Map<string, NewsPage> => {
    return selectHomeState(state)?.newsPageMap;
};
export const selectNewsMap = (state: AllState): Map<string, News> => {
    return selectHomeState(state)?.newsMap;
};
export const selectYTBMap = (state: AllState): Map<string, YouTube> | null | undefined => {
    return selectHomeState(state)?.videosMap;
};
export const selectVideoUpdateTime = (state: AllState): number => {
    return selectHomeState(state)?.updateVideoTimes;
};
export const selectBannersUpdateTime = (state: AllState): number => {
    return selectHomeState(state)?.updateBannerTimes;
};
export const selectNewsUpdateTime = (state: AllState): number => {
    return selectHomeState(state)?.updateNewsTimes;
};

export const selectContactDealer = (state: AllState): ContactDealerModel | null | undefined => {
    return selectHomeState(state)?.contactDealer;
};



