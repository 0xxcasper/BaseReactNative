import { requestUsedCarDetail } from './../actions/usedCarActions';
import { KeyValueModel, IconModel } from './../types/modelTypes';
import { UsedCarBuilder } from './../builders';
import { sortCollections, isBlank } from './../helpers';
import { useMemo, useEffect } from 'react';
import { selectCurrentPage, selectTotalPages } from './../selectors/usedCarSelectors';
import { Map } from 'immutable';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsedCarListMap, selectUsedCarDetailMap } from '../selectors/usedCarSelectors';
import { UsedCarModel, UsedCarDetailModel, Thumb } from './../types/newCarModelTypes';
import { TIME_DAY } from '../common/const';
import utils from '../common/utils';
import labels from '../i18n/labels';

export const useUsedCarListMap = (): Map<string, UsedCarModel> => {
    return useSelector(selectUsedCarListMap);
};

export const useUsedCarKeys = (): string[] | null | undefined => {
    const _usedCarMap = useUsedCarListMap()
    return useMemo(() => {
        if (_usedCarMap && _usedCarMap.size > 0) {
            return sortCollections(_usedCarMap.toIndexedSeq().toArray(), 'carName', false).map((_item: UsedCarModel) => {
                return _item.used_car_id
            })
        }
        return null
    }, [_usedCarMap])
};

export const useUsedCarList = (): UsedCarModel[] | null | undefined => {
    const _usedCarMap = useUsedCarListMap()
    return useMemo(() => {
        if (_usedCarMap && _usedCarMap.size > 0) {
            return sortCollections(_usedCarMap.toIndexedSeq().toArray(), 'carName', false)
        }
        return null
    }, [_usedCarMap])
};

export const useUsedCarId = (carId: string): UsedCarModel | null | undefined => {
    return useUsedCarListMap().get(carId);
};

export const useUsedCarOverView = (carId: string): KeyValueModel[] | null | undefined => {
    const _carInfo = useUsedCarDetailId(carId)
    if (_carInfo) {
        return UsedCarBuilder.getParams(_carInfo)
    }
    return null
}

export const useUsedCarOverViewDashBoard = (carId: string): IconModel[] | null | undefined => {
    const _carInfo = useUsedCarDetailId(carId)
    if (_carInfo) {
        return UsedCarBuilder.getOverviewDashBoard(_carInfo)
    }
    return null
}

export const useUsedCarCurrentPage = (): number => {
    return useSelector(selectCurrentPage);
};

export const useUsedCarTotalPages = (): number => {
    return useSelector(selectTotalPages);
};

export const useUsedCarDetailMap = (): Map<string, UsedCarDetailModel> => {
    return useSelector(selectUsedCarDetailMap);
};

export const useUsedCarDetailId = (carId: string): UsedCarDetailModel | null | undefined => {
    const dispatch = useDispatch()
    const _usedDetail = useUsedCarDetailMap().get(carId + '')
    useEffect(() => {
        if (_usedDetail) {
            const { createTimeMs } = _usedDetail
            if (Date.now() - createTimeMs > TIME_DAY) {
                dispatch(requestUsedCarDetail({
                    carId
                }))
            }
        } else {
            dispatch(requestUsedCarDetail({
                carId
            }))
        }
    }, [])
    return _usedDetail
};

export const useUsedCarDescription = (carId: string): string => {
    const _carDetail = useUsedCarDetailId(carId + '')
    if (_carDetail && _carDetail.overview && !isBlank(_carDetail.overview.description)) {
        // return utils.clearHTMLTags(_carDetail.overview.description)
        return _carDetail.overview.description;
    }
    return labels.empty
};


export const useUsedCarThumbs = (carId: string): Thumb[] | null | undefined => {
    const _carDetail = useUsedCarDetailId(carId + '')
    if (_carDetail && _carDetail.overview && _carDetail.overview.galleries && _carDetail.overview.galleries.length > 0) {
        return _carDetail.overview.galleries
    }
    return []
};

export const useIsHasUsedCarWithId = (carId: string): boolean => {
    const _carDetail = useUsedCarDetailId(carId + '')
    if (_carDetail) {
        return true
    }
    return false
}
