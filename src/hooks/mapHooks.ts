import { isBlank } from './../helpers';
import { requestLocationNearly, requestLocationBySearch } from './../actions/mapActions';
import { useDispatch } from 'react-redux';
import { LocationModel } from './../types/modelTypes';
import { useSelector } from 'react-redux';
import { LatLongLocation } from '../types/modelTypes';
import { selectCurrentLocation, selectLocationNearlyMap, selectFavoriteListMap, selectSearchKeyMarker, selectEndLocationDirection, selectRadius, selectHomeAddress, selectCompanyAddress } from './../selectors/mapSelectors';
import { Map } from 'immutable';
import { selectIsShowTraffic } from '../selectors/mapSelectors';

export const useCurrentLocation = (): LatLongLocation | null | undefined => {
    return useSelector(selectCurrentLocation);
};

export const useLocationNearlyMap = (): Map<string, LocationModel[]> | null | undefined => {
    return useSelector(selectLocationNearlyMap);
};

export const useLocationNearlyWithType = (typeNearly: string, radius: number | null = null): LocationModel[] | null | undefined => {
    const _locations = useLocationNearlyMap()?.get(typeNearly)
    const dispatch = useDispatch()
    if ((!_locations || _locations.length === 0) && !isBlank(typeNearly)) {
        dispatch(requestLocationNearly(typeNearly, radius))
    }
    return _locations
};

export const useFavoriteListMap = (): Map<string, LocationModel> | null | undefined => {
    const _favoriteMap = useSelector(selectFavoriteListMap)
    if(_favoriteMap && _favoriteMap.size > 0) {
        return _favoriteMap
    }
    return null
};

export const useFavoriteList = (): LocationModel[] | null | undefined => {
    return useFavoriteListMap()?.valueSeq().toArray()
};

export const useIsFavorite = (locationId: string): boolean => {
    const _result = useFavoriteListMap()?.get(locationId + '')
    if (_result) {
        return true
    }
    return false
};

export const useLocationBySearchKey = (searchText: string, radius: number | null = null): LocationModel[] | null | undefined => {
    const _locations = useLocationNearlyMap()?.get(searchText)
    const dispatch = useDispatch()
    if ((!_locations || _locations.length === 0) && !isBlank(searchText)) {
        dispatch(requestLocationBySearch(searchText))
    }
    return _locations
};


export const useSearchKeyMarker = (): string | null | undefined => {
    return useSelector(selectSearchKeyMarker)
};

export const useRadius = (): number => {
    return useSelector(selectRadius)
};


export const useIsShowTraffic = (): boolean => {
    return useSelector(selectIsShowTraffic)
};

export const useLocationByKeyMarker = (): LocationModel[] => {
    const _searchKey = useSearchKeyMarker()
    const _dataSource = useLocationNearlyMap()
    const _radius = useRadius()
    return (_dataSource?.get(_searchKey || '') || []).filter((_location: LocationModel) => {
        return (_location.distance || 1) <= _radius
    })
};

export const useEndLocationDirection = (): LocationModel | null | undefined => {
    return useSelector(selectEndLocationDirection)
};

export const useHomeAddress = (): LocationModel | null | undefined => {
    return useSelector(selectHomeAddress)
};

export const useCompanyAddress = (): LocationModel | null | undefined => {
    return useSelector(selectCompanyAddress)
};