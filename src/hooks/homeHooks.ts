import { ContactDealerModel, Phones, Department, NonDepartment } from './../types/modelTypes';
import { Map } from 'immutable';
import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../actions";
import { REQUEST_HOME_BANNERS, REQUEST_HOME_NEWS } from "../actionTypes/homeActionTypes";
import { LAST_TIME_FETCH_API_CONST, TIME_DAY, TIME_HOUR, TIME_MIN } from '../common/const';
import { selectBannerMap, selectNewsMap, selectNewsPageMap, selectNewsUpdateTime, selectYTBMap } from '../selectors/homeSelectors';
import { HomeBanner, News, NewsPage, YouTube } from "../types/modelTypes";
import { REQUEST_HOME_YOU_TUBE } from './../actionTypes/homeActionTypes';
import { getLastTimeFetch, isOverTimeFetch, setLastTimeFetch } from './../helpers';
import { selectVideoUpdateTime, selectContactDealer } from './../selectors/homeSelectors';

export const useHomeBannerMap = () => {
    const dispatch = useDispatch();
    const _bannersMap = useSelector(selectBannerMap);
    getLastTimeFetch(LAST_TIME_FETCH_API_CONST.HOME_BANNERS).then((bannersLastedTime) => {
        const _overLastTime = isOverTimeFetch(bannersLastedTime, TIME_DAY)
        if (!_bannersMap || _bannersMap.size === 0 || _overLastTime) {
            dispatch(createAction(REQUEST_HOME_BANNERS));
            setLastTimeFetch(LAST_TIME_FETCH_API_CONST.HOME_BANNERS)
        }
    })
    return _bannersMap;
};
export const useHomeBannerInfo = (_bannerId: string): HomeBanner | null | undefined => {
    return useHomeBannerMap()?.get(_bannerId || '');
};
export const useNewsPageMap = (): Map<string, NewsPage> => {
    const dispatch = useDispatch();
    const _dataMap = useSelector(selectNewsPageMap);
    if (!_dataMap || _dataMap.size === 0) {
        dispatch(createAction(REQUEST_HOME_NEWS));
    }
    return _dataMap;
};
export const useNewsMap = (): Map<string, News> => {
    const dispatch = useDispatch();
    const _newsMap = useSelector(selectNewsMap);
    const _updateTime = useSelector(selectNewsUpdateTime)
    if (!_newsMap || _newsMap.size === 0 || Date.now() - _updateTime > TIME_HOUR) {
        dispatch(createAction(REQUEST_HOME_NEWS));
    }
    return _newsMap;
};
export const useNewsInfo = (newsId: string): News | undefined => {
    return useNewsMap().get(newsId || '');
};
export const useNewsPage = (pageId: string): NewsPage | undefined => {
    return useNewsPageMap().get(pageId || '');
};
export const useNewsIdsOfPage = (pageId: string): string[] | undefined | null => {
    const newsIds = useNewsPage(pageId)?.newsIds;
    return useMemo(() => {
        return newsIds?.toIndexedSeq()?.toArray();
    }, [newsIds]);
};

export const useYTBlinksMap = (): Map<string, YouTube> => {
    const dispatch = useDispatch();
    const _youTubes = useSelector(selectYTBMap);
    const _updateTime = useSelector(selectVideoUpdateTime)
    if (!_youTubes || _youTubes.size === 0 || ((Date.now() - _updateTime) > (TIME_MIN * 15))) {
        dispatch(createAction(REQUEST_HOME_YOU_TUBE));
    }
    return _youTubes || Map<string, YouTube>();
};

export const useYTBlinkId = (videoId: string): YouTube | undefined | null => {
    return useYTBlinksMap().get(videoId || '')
};

export const useContactsDealer = (): ContactDealerModel | null | undefined => {
    return useSelector(selectContactDealer)
};

export const useContactDealer = (): ContactDealerModel | null | undefined => {
    return useSelector(selectContactDealer)
};

export const usePhoneDealer = (): Phones | null | undefined => {
    return useContactDealer()?.phones
}

export const useDepartment = (): Department[] | null | undefined => {
    return usePhoneDealer()?.department
}

export const useDepartmentSOS = (): NonDepartment[] | null | undefined => {
    const _departments = useDepartment()
    if (_departments && _departments.length > 0) {
        var _response: NonDepartment[] = []
        _departments.forEach((contact) => {
            if (contact && contact.phong_ho_tro_khan_cap && contact.phong_ho_tro_khan_cap.length > 0) {
                _response = _response.concat(contact.phong_ho_tro_khan_cap)
            }
        })
        return _response
    }
    return null
}

export const useDepartmentSOSPhone = (): string | null | undefined => {
    const _useDepartmentSOS = useDepartmentSOS()
    const _contactSOS = useMemo(() => {
        if (_useDepartmentSOS && _useDepartmentSOS.length > 0) {
            return _useDepartmentSOS[0].phone
        }
        return null;
    }, [_useDepartmentSOS])
    return _contactSOS
}


export const useDepartmentBusiness = (): NonDepartment[] | null | undefined => {
    const _departments = useDepartment()
    if (_departments && _departments.length > 0) {
        var _response: NonDepartment[] = []
        _departments.forEach((contact) => {
            if (contact && contact.phong_kinh_doanh && contact.phong_kinh_doanh.length > 0) {
                _response = _response.concat(contact.phong_kinh_doanh)
            }
        })
        return _response
    }
    return null
}

export const useDepartmentBusinessPhone = (): (string | null)[] | undefined => {
    const _useDepartmentBusinessSOS = useDepartmentBusiness()
    const _contactSOS = useMemo(() => {
        if (_useDepartmentBusinessSOS && _useDepartmentBusinessSOS.length > 0) {
            return _useDepartmentBusinessSOS.map((contact) => {
                return contact.phone
            })
        }
        return [];
    }, [_useDepartmentBusinessSOS])
    return _contactSOS
}