import {
    AllState,
    HomeStateType
} from "types/reducerStateTypes";
import {HomeBannerModel} from "types/modelTypes";

const selectHomeState = (state: AllState): HomeStateType => {
    return state.homeState;
};

export const selectHomeBanners = (state: AllState): HomeBannerModel[] => {
    return selectHomeState(state).banners
}
