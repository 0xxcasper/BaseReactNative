import { selectCurrentLocation } from './../selectors/mapSelectors';
import { isBlank } from './../helpers';
import { requestLocationsTestDrive } from './../actions/dealerLocationActions';
import { selectLocationAvailTestDriveMap, selectLocationTestDriveLastUpdateTime } from './../selectors/dealerLocationSelectors';
import { Map } from 'immutable';
import { DealerLocation } from "../types/modelTypes";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { filterSearch } from "../helpers";
import { createAction } from "../actions";
import { TIME_DAY } from "../common/const";
import { selectDealerLocationLastUpdateTime, selectDealerLocationMap } from "../selectors/dealerLocationSelectors";
import { REQUEST_DEALER_LOCATION_LIST } from "../actionTypes/dealerLocationActionTypes";

export const useDealerLocationMap = (): Map<string, DealerLocation> | null | undefined => {
    const dispatch = useDispatch();
    const _result = useSelector(selectDealerLocationMap);
    return _result;
};

export const useDealerLocationList = (): DealerLocation[] | null => {
    const _dataMap = useDealerLocationMap();
    if (_dataMap) {
        return _dataMap.valueSeq().toArray();
    }
    return []
}
export const useDealerLocationSearch = (searchText: string | null | undefined): DealerLocation[] | null => {
    const _dataSearch = useDealerLocationList();
    if(!searchText || searchText === "") return _dataSearch;
    if (_dataSearch && _dataSearch.length > 0) {
        return useMemo(() => {
            return filterSearch(_dataSearch, 'name', searchText);
        }, [searchText, _dataSearch]);
    }
    return null;
};
export const useDealerLocationName = (dealerLocationId: string | null | undefined): string | null | undefined => {
    return useDealerLocationMap()?.get(dealerLocationId?.toString() || '')?.name;
};

export const useLocationAvailTestDriveMap = (carModelId: string | null | undefined = null): Map<string, DealerLocation> | null | undefined => {
    const dispatch = useDispatch();
    const _result = useSelector(selectLocationAvailTestDriveMap);
    const _updateTime = useSelector(selectLocationTestDriveLastUpdateTime);
    if (!_result || _result.size === 0 || (Date.now() - _updateTime) > TIME_DAY) {
        if (!isBlank(carModelId)) {
            dispatch(requestLocationsTestDrive(carModelId!))
        }
    }
    return _result;
};

export const useLocationAvailTestDriveSearch = (searchText: string | null | undefined): DealerLocation[] | null => {
    const _dataMap = useLocationAvailTestDriveMap();
    if (_dataMap) {
        return useMemo(() => {
            return filterSearch(_dataMap.toIndexedSeq().toArray(), 'name', searchText);
        }, [searchText, _dataMap]);
    }
    return null;
};

export const useLocationAvailTestDriveName = (dealerLocationId: string | null | undefined): string | null | undefined => {
    return useLocationAvailTestDriveMap()?.get(dealerLocationId?.toString() || '')?.name;
};
