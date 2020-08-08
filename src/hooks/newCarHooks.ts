import { useMemo } from 'react';
import {getLastTimeFetch, isOverTimeFetch, setLastTimeFetch, sortCollections} from './../helpers';
import { requestNewCarListAction } from './../actions/newCarActions';
import { Map } from 'immutable';
import { useSelector, useDispatch } from "react-redux";
import {
    selectCarCompetitors,
    selectCarGalleriesThumb,
    selectCarSpecificationsOverViewMap,
    selectColorsKeys,
    selectExteriorGalleries,
    selectInteriorGalleries,
    selectNewCarDisplayMap,
    selectNewCarInfoDetail,
    selectNewCarInfoMap,
    selectOperationGalleries,
    selectOtherGrades,
    selectSafetiesGalleries,
    selectColorsMap,
    selectExteriorAccessory,
    selectInteriorAccessory,
    selectUtilityAccessory,
    selectCareAccessory,
    selectElectronicAccessory,
    selectFilterCarModel,
    selectCarSpecificationsFeaturesMap,
    selectAccessoryThumb,
    selectUpdateCarListTime,
    selectAccessory,
    selectOthersGalleries
} from './../selectors/newCarSelectors';
import { Competitor, NewCarInfoDetail, NewCarModel, OtherGrade, Overview, Thumb, ExteriorImage, FilterNewCarModel, Feature } from './../types/newCarModelTypes';
import {LAST_TIME_FETCH_API_CONST, TIME_DAY} from '../common/const';

export const useNewCarInfoMap = (): Map<string, NewCarModel> | null | undefined => {
    const _carMap = useSelector(selectNewCarInfoMap)
    const dispatch = useDispatch()
    getLastTimeFetch(LAST_TIME_FETCH_API_CONST.NEW_CAR_LIST).then((carListLastedTime) => {
        const _overLastTime = isOverTimeFetch(carListLastedTime, TIME_DAY)
        if (!_carMap || _carMap.size === 0 || _overLastTime) {
            dispatch(requestNewCarListAction(() => { }, () => { }))
            setLastTimeFetch(LAST_TIME_FETCH_API_CONST.NEW_CAR_LIST)
        }
    })
    return _carMap;
};

export const useNewCarDisplayMap = (): Map<string, NewCarModel> | null | undefined => {
    const _carMap = useSelector(selectNewCarDisplayMap);
    return _carMap
};

export const useNewCarDisplayKeys = (): string[] => {
    const _carListMap = useNewCarDisplayMap()
    if (_carListMap && _carListMap.size > 0) {
        return sortCollections(_carListMap.toIndexedSeq().toArray(), 'name', true).map((_item: NewCarModel) => {
            return _item.id + ''
        });
    }
    return []
};

export const checkDidLoadDataNewCarList = (): boolean => {
    const _carListMap = useNewCarDisplayMap()
    if(_carListMap && _carListMap.size > 0) {
        return true
    }
    return false
};

export const useNewCarInfoId = (carId: string): NewCarModel | null | undefined => {
    const _newCarsInfoMap = useNewCarInfoMap()
    if (_newCarsInfoMap) {
        return useNewCarInfoMap()?.get(carId + '')
    }
    return undefined
};

export const useNewCarInfoDetail = (): NewCarInfoDetail | null | undefined => {
    return useSelector(selectNewCarInfoDetail);
};

export const useNewCarInfoDetailId = (): string | number | null | undefined => {
    return useNewCarInfoDetail()?.id
};
export const useIsHasCarDetail = (carId: string): boolean => {
    if (useNewCarInfoId(carId)) {
        return true
    }
    return false
};
export const useCarDetailName = (carId: string): string => {
    const _carDetail = useNewCarInfoId(carId)
    if (_carDetail) {
        const { name } = _carDetail
        return name || ''
    }
    return ''
};
export const useCarSpecificationsOverview = (): Map<string, Overview> | null | undefined => {
    return useSelector(selectCarSpecificationsOverViewMap);
};

export const useCarSpecificationsOverviewId = (overviewId: string): Overview | null | undefined => {
    return useCarSpecificationsOverview()?.get(overviewId);
};

export const useCarSpecificationsFeatures = (): Map<string, Feature> | null | undefined => {
    return useSelector(selectCarSpecificationsFeaturesMap);
};

export const useCarSpecificationsFeaturesId = (featuresId: string): Feature | null | undefined => {
    return useCarSpecificationsFeatures()?.get(featuresId);
};

export const useCarGalleriesThumb = (): string[] | null | undefined => {
    return useSelector(selectCarGalleriesThumb)
};

export const useCarCompetitors = (): Map<string, Competitor> | null | undefined => {
    return useSelector(selectCarCompetitors)
};
export const useCarCompetitorsId = (id: string): Competitor | null | undefined => {
    return useCarCompetitors()?.get(id)
};

export const useOtherGrades = (): Map<string, OtherGrade> | null | undefined => {
    return useSelector(selectOtherGrades)
};

export const useOtherGradesKeys = (): string[] | null | undefined => {
    const _useOtherGrades = useOtherGrades()
    return useMemo(() => {
        if (_useOtherGrades) {
            return _useOtherGrades.keySeq().toArray();
        }
        return null;
    }, [_useOtherGrades]);
};

export const useExteriorGalleries = (): Thumb[] | null | undefined => {
    return useSelector(selectExteriorGalleries)
};

export const useOtherGradeId = (id: string): Competitor | null | undefined => {
    return useOtherGrades()?.get(id)
};

export const useInteriorGalleries = (): Thumb[] | null | undefined => {
    return useSelector(selectInteriorGalleries)
};

export const useOperationGalleries = (): Thumb[] | null | undefined => {
    return useSelector(selectOperationGalleries)
};

export const useSafetiesGalleries = (): Thumb[] | null | undefined => {
    return useSelector(selectSafetiesGalleries)
};

export const useOthersGalleries = (): Thumb[] | null | undefined => {
    return useSelector(selectOthersGalleries)
};


export const useColorsMap = (): Map<string, ExteriorImage> | null | undefined => {
    return useSelector(selectColorsMap);
};

export const useColorsList = (): ExteriorImage[] | null | undefined => {
    return useColorsMap()?.valueSeq().toArray()
}

export const useColorsKeys = (): string[] | null | undefined => {
    return useSelector(selectColorsKeys);
};

export const useColorsId = (colorId: string): ExteriorImage | null | undefined => {
    return useColorsMap()?.get(colorId)
};

export const useAccessoryThumbs = (): string[] | null | undefined => {
    return useSelector(selectAccessoryThumb);
};

export const useExteriorAccessory = (): ExteriorImage[] | null | undefined => {
    return useSelector(selectExteriorAccessory);
};

export const useInteriorAccessory = (): ExteriorImage[] | null | undefined => {
    return useSelector(selectInteriorAccessory);
};

export const useUtilityAccessory = (): ExteriorImage[] | null | undefined => {
    return useSelector(selectUtilityAccessory);
};

export const useCareAccessory = (): ExteriorImage[] | null | undefined => {
    return useSelector(selectCareAccessory);
};

export const useElectronicAccessory = (): ExteriorImage[] | null | undefined => {
    return useSelector(selectElectronicAccessory);
};

export const useFilterNewCarModel = (): FilterNewCarModel | null | undefined => {
    return useSelector(selectFilterCarModel);
};

export const useFilterCarPrice = (): string | null | undefined => {
    return useFilterNewCarModel()?.keyItemPrice;
};

export const useFilterCarFuelType = (): string[] | null | undefined => {
    return useFilterNewCarModel()?.fuelTypes;
};

export const useFilterCarModelType = (): string[] | null | undefined => {
    return useFilterNewCarModel()?.carModelIds;
};

export const useAccessory = () => {
    return useSelector(selectAccessory);
}




