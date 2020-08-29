import {useSelector} from "react-redux";
import {selectHomeBanners} from 'selectors/homeSelectors';
import {HomeBannerModel} from "types/modelTypes";

export const useHomeBanners = (): HomeBannerModel[] => {
    return useSelector(selectHomeBanners)
}