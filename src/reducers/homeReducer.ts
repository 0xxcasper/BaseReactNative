import { RECEIVE_HOME_YOU_TUBE, UpdateHomeYTB, RECEIVE_CONTACT_INFO, UpdateContactInfo } from './../actionTypes/homeActionTypes';
import { HomeStateType } from "../types/reducerStateTypes";
import { Map, OrderedMap } from 'immutable';
import { TIME_MIN, TIME_SEC } from "../common/const";
import {
    ADD_NEWS,
    AddNewsAction,
    HomeActionTypes,
    RECEIVE_HOME_BANNERS,
    UPDATE_NEWS_PAGE_INFO,
    UpdateHomeBannerPopupAction,
    UpdateNewsPageInfoAction
} from "../actionTypes/homeActionTypes";
import { HomeBanner, News, NewsPage, YouTube } from "../types/modelTypes";

const _initState: HomeStateType = {
    banner: {
        bannerMap: Map<string, HomeBanner>(),
        interval: TIME_SEC * 30,
    },
    popup: {
        popupMap: Map<string, HomeBanner>(),
        interval: TIME_MIN * 5,
        lastShowTime: 0
    },
    newsMap: Map<string, News>(),
    newsPageMap: Map<string, NewsPage>(),
    videosMap: Map<string, YouTube>(),
    updateVideoTimes: 0,
    updateBannerTimes: 0,
    updateNewsTimes: 0,
    contactDealer: null
};
const _updateHomeBannerPopups = (state: HomeStateType, action: HomeActionTypes): HomeStateType => {
    const _action = action as UpdateHomeBannerPopupAction;
    const {
        popups,
        banners
    } = _action;

    console.log('_action', _action);

    if (banners) {
        let _bannerMap = Map<string, HomeBanner>();
        banners.forEach((_banner: HomeBanner) => {
            _bannerMap = _bannerMap.set(_banner.id || '', _banner);
        });
        state = {
            ...state,
            banner: {
                bannerMap: _bannerMap,
                interval: state?.banner?.interval
            }
        }
    }
    if (popups) {
        let _popupMap = Map<string, HomeBanner>();
        popups.forEach((_banner: HomeBanner) => {
            _popupMap = _popupMap.set(_banner.id || '', _banner);
        });
        state = {
            ...state,
            popup: {
                popupMap: _popupMap,
                interval: state?.banner?.interval,
                lastShowTime: state?.popup?.lastShowTime,
            },
            updateBannerTimes: Date.now()
        }
    }
    return state;
};

const _addNews = (state: HomeStateType, action: HomeActionTypes): HomeStateType => {
    const _action = action as AddNewsAction;
    const {
        pageId,
        news
    } = _action;
    if (pageId && news) {
        let {
            newsMap,
            newsPageMap
        } = state;
        let _currentInfo: NewsPage | undefined = newsPageMap.get(pageId);
        if (!_currentInfo) {
            _currentInfo = {
                id: pageId,
                newsIds: OrderedMap()
            };
        }
        let {
            newsIds
        } = _currentInfo;
        if (!newsIds) {
            newsIds = OrderedMap();
        }
        news.forEach((_tempNews: News) => {
            if (_tempNews.id) {
                let _currentNews: News | undefined = newsMap.get(_tempNews.id);
                if (!_currentNews) {
                    _currentNews = _tempNews;
                } else {
                    _currentNews = {
                        ..._currentNews,
                        ..._tempNews
                    }
                }
                newsMap = newsMap.set(_tempNews.id, _currentNews);
                if (!newsIds?.get(_tempNews.id)) {
                    newsIds = newsIds?.set(_tempNews.id, _tempNews.id)
                }
            }
        });
        _currentInfo = {
            ..._currentInfo,
            newsIds
        };
        newsPageMap = newsPageMap.set(pageId, _currentInfo);
        state = {
            ...state,
            newsPageMap: newsPageMap,
            newsMap,
            updateNewsTimes: Date.now()
        }
    }
    return state;
};
const _updateNewsPageInfo = (state: HomeStateType, action: HomeActionTypes): HomeStateType => {
    const _action = action as UpdateNewsPageInfoAction;
    const {
        newsPageInfo
    } = _action;
    if (newsPageInfo) {
        let {
            newsPageMap
        } = state;
        const {
            id
        } = newsPageInfo;
        if (id) {
            let _currentInfo = newsPageMap.get(id);
            if (!_currentInfo) {
                if (!_currentInfo) {
                    _currentInfo = {
                        id: id,
                        newsIds: OrderedMap()
                    };
                }
            }
            _currentInfo = {
                ..._currentInfo,
                ...newsPageInfo
            };
            newsPageMap = newsPageMap.set(id, _currentInfo);
            state = {
                ...state,
                newsPageMap: newsPageMap
            }
        }

    }
    return state;
};

const _updateYouTubeList = (state: HomeStateType, action: HomeActionTypes): HomeStateType => {
    const _action = action as UpdateHomeYTB;
    const {
        videos
    } = _action;

    if (videos) {
        var _videosMap = Map<string, YouTube>();
        videos.forEach((item) => {
            _videosMap = _videosMap.set(item.videoId!, item)
        })
        state = {
            ...state,
            videosMap: _videosMap,
            updateVideoTimes: Date.now()
        }
    }
    return state;
}

export const _updateContactInfo = (state: any, action: HomeActionTypes): HomeStateType => {
    const _action = action as UpdateContactInfo;
    const {
        contact
    } = _action

    return {
        ...state,
        contactDealer: contact
    }
};


export const homeStateToJs = (state: HomeStateType): any => {
    const {
        banner,
        popup,
        newsMap,
        newsPageMap,
        videosMap,
        updateVideoTimes,
        updateBannerTimes,
        updateNewsTimes,
        contactDealer
    } = state;
    return {
        banner: {
            bannerMap: Map(banner.bannerMap),
            interval: banner.interval,
        },
        popup: {
            popupMap: Map(popup.popupMap),
            interval: popup.interval,
            lastShowTime: popup.lastShowTime,
        },
        newsMap: Map(newsMap),
        newsPageMap: Map(newsPageMap),
        videosMap: Map(videosMap),
        updateVideoTimes,
        updateBannerTimes,
        updateNewsTimes,
        contactDealer
    }
};

export const homeStateFromJs = (state: any): HomeStateType => {
    const {
        banner,
        popup,
        newsMap,
        newsPageMap,
        videosMap,
        updateVideoTimes,
        updateBannerTimes,
        updateNewsTimes,
        contactDealer
    } = state;
    return {
        ..._initState,
        banner: {
            bannerMap: Map(banner.bannerMap),
            interval: banner.interval,
        },
        popup: {
            popupMap: Map(popup.popupMap),
            interval: popup.interval,
            lastShowTime: popup.lastShowTime,
        },
        newsMap: Map(newsMap),
        newsPageMap: Map(newsPageMap),
        videosMap: Map(videosMap),
        updateVideoTimes,
        updateBannerTimes,
        updateNewsTimes,
        contactDealer
    }
};

export default (state = _initState, action: HomeActionTypes): HomeStateType => {
    switch (action.type) {
        case RECEIVE_HOME_BANNERS:
            return _updateHomeBannerPopups(state, action);
        case UPDATE_NEWS_PAGE_INFO:
            return _updateNewsPageInfo(state, action);
        case ADD_NEWS:
            return _addNews(state, action);
        case RECEIVE_HOME_YOU_TUBE:
            return _updateYouTubeList(state, action);
        case RECEIVE_CONTACT_INFO:
            return _updateContactInfo(state, action);
    }
    return state;
}
