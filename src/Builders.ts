/*
* receive Data from API
* post Data to Server
* format this data here
* */

import {HomeBannerModel} from "types/modelTypes";

export const HomeBuilder = Object.freeze({
    bannerFromApi(bannerData: any | null | undefined): HomeBannerModel[] {
        if(!bannerData || !bannerData['HD_WALLPAPER']) return []
        const banners = bannerData['HD_WALLPAPER']
        return banners.map((banner: any): HomeBannerModel  => {
            return {
                id: banner.id,
                image: banner.wallpaper_image,
                imageThumb: banner.wallpaper_image_thumb
            }
        })
    }
})