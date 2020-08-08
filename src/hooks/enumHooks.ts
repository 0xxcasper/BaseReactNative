import { EnumFilterPrice } from './../types/modelTypes';
import { REQUEST_CAR_FILTER_ENUM } from './../actionTypes/enumActionTypes';
import { selectCarModels, selectCarFuelTypes, selectCarSeatTypes, selectCarSourceTypes, selectCarTypesFilter, selectGenderMap, selectUpdateTimeFilter, selectFilterPriceMap } from './../selectors/enumSelectors';
import { Map } from 'immutable';
import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAction } from '../actions';
import { REQUEST_CAR_INSURANCE_PROVIDERS, REQUEST_CAR_INSURANCE_TYPES } from '../actionTypes/enumActionTypes';
import { filterSearch, sortCollections } from '../helpers';
import {
    selectCarInsuranceProviders,
    selectCarInsuranceTypes,
    selectCarRelationshipMap
} from "../selectors/enumSelectors";
import { EnumEntry } from "../types/modelTypes";
import { TIME_DAY } from '../common/const';

export const useCarRelationshipMap = (): Map<string, EnumEntry> => {
    return useSelector(selectCarRelationshipMap);
}
export const useCarRelationshipLabel = (relationship: string | null | undefined): string | undefined => {
    return useCarRelationshipMap()?.get(relationship || '')?.label;
};

export const useGenderMap = (): Map<string, EnumEntry> => {
    return useSelector(selectGenderMap);
}

export const useGenderLabel = (gender: string | null | undefined): string | undefined => {
    return useGenderMap()?.get(gender || '')?.label;
};

export const useCarInsuranceTypeMap = (): Map<string, EnumEntry> => {
    return useSelector(selectCarInsuranceTypes);
}
export const useCarInsuranceTypeLabel = (insuranceType: string | undefined): string | undefined => {
    return useCarInsuranceTypeMap()?.get(insuranceType || '')?.label;
}
export const useCarInsuranceTypes = (): EnumEntry[] | null => {
    const dispatch = useDispatch();
    const _insuranceTypeMap = useCarInsuranceTypeMap();
    if (!_insuranceTypeMap || _insuranceTypeMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_INSURANCE_TYPES));
    }
    return useMemo(() => {
        if (_insuranceTypeMap) {
            return sortCollections(_insuranceTypeMap.toIndexedSeq().toArray(), 'sortValue');
        }
        return null;
    }, [_insuranceTypeMap]);
}
export const useCarInsuranceProviderMap = (): Map<string, EnumEntry> => {
    return useSelector(selectCarInsuranceProviders);
}
export const useCarInsuranceProviderLabel = (insuranceProvider: string | undefined): string | undefined => {
    return useCarInsuranceProviderMap()?.get(insuranceProvider || '')?.label;
}
export const useSearchCarInsuranceProviders = (searchText: string | null): EnumEntry[] | null => {
    const dispatch = useDispatch();
    const _insuranceProviderMap = useCarInsuranceProviderMap();
    if (!_insuranceProviderMap || _insuranceProviderMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_INSURANCE_PROVIDERS));
    }
    return useMemo(() => {
        if (_insuranceProviderMap) {
            return filterSearch(_insuranceProviderMap.toIndexedSeq().toArray(), 'label', searchText);
        }
        return null;
    }, [searchText, _insuranceProviderMap]);
}

export const useCarModels = (): Map<string, EnumEntry> => {
    const dispatch = useDispatch()
    const _carModels = useSelector(selectCarModels)
    const _updateTime = useSelector(selectUpdateTimeFilter)
    if (!_carModels || _carModels.size === 0 || (Date.now() - _updateTime > TIME_DAY)) {
        dispatch(createAction(REQUEST_CAR_FILTER_ENUM))
    }
    return _carModels
}

export const useCarModelList = (): EnumEntry[] | null | undefined => {
    return useCarModels().valueSeq().toArray()
}

export const useCarModelsId = (id: string): EnumEntry | null | undefined => {
    return useCarModels().get(id)
}

export const useCarFuelTypes = (): Map<string, EnumEntry> => {
    return useSelector(selectCarFuelTypes)
}

export const useCarFuelTypeList = (): EnumEntry[] | null | undefined => {
    return useCarFuelTypes().valueSeq().toArray()
}


export const useCarFuelTypesId = (id: string): EnumEntry | null | undefined => {
    return useCarFuelTypes().get(id)
}

export const useCarSeatTypes = (): Map<string, EnumEntry> => {
    return useSelector(selectCarSeatTypes)
}

export const useCarSeatTypeList = (): EnumEntry[] | null | undefined => {
    return useCarSeatTypes().valueSeq().toArray()
}

export const useCarSeatTypesId = (id: string): EnumEntry | null | undefined => {
    return useCarSeatTypes().get(id)
}

export const useCarSourceTypes = (): Map<string, EnumEntry> => {
    return useSelector(selectCarSourceTypes)
}

export const useCarSourceTypesList = (): EnumEntry[] | null | undefined => {
    return useCarSourceTypes().valueSeq().toArray()
}

export const useCarSourceId = (id: string): EnumEntry | null | undefined => {
    return useCarSourceTypes().get(id)
}

export const useCarTypesFilter = (): Map<string, EnumEntry> => {
    return useSelector(selectCarTypesFilter)
}

export const useCarTypesFilterList = (): EnumEntry[] | null | undefined => {
    return useCarTypesFilter().valueSeq().toArray()
}

export const useCarTypesFilterId = (id: string): EnumEntry | null | undefined => {
    return useCarTypesFilter().get(id)
}
export const useFilterPriceMap = (): Map<string, EnumFilterPrice> => {
    return useSelector(selectFilterPriceMap)
}
