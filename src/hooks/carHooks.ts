import { requestAccessory } from './../actions/carActions';
import { isOverTimeFetch, setLastTimeFetch } from './../helpers';
import { Alert } from 'react-native';
import { REQUEST_CAR_BRAND_DEALER, REQUEST_CAR_AVAIL_TEST_DRIVE } from './../actionTypes/carActionTypes';
import { selectCarBrandDealerMap, selectCarAvailTestDriveMap, selectCarAvailUpdateTime, selectAccessoryMap } from './../selectors/carSelectors';
import { Promotion, ServiceHistory, CarBrandDealer, CarModelTestDrive } from './../types/modelTypes';
import { useDispatch, useSelector } from "react-redux";
import {
    selectCarBrandMap,
    selectCarEditorMap,
    selectCarGradeMap,
    selectCarInfoMap,
    selectCarModelMap
} from "../selectors/carSelectors";
import { Map } from 'immutable'
import { CarBrand, CarEditor, CarGrade, CarInfo, CarModel, SearchCarBrandModelGradeResult } from "../types/modelTypes";
import { createAction } from "../actions";
import { REQUEST_CAR_BRAND_LIST, REQUEST_CAR_LIST } from "../actionTypes/carActionTypes";
import { useMemo } from "react";
import { filterSearch, isBlank, sortCollections, getLastTimeFetch } from '../helpers';
import { CAR_EDITOR_DEFAULT_ID, TIME_DAY, LAST_TIME_FETCH_API_CONST } from "../common/const";
import { Accessories } from '../types/newCarModelTypes';

export const useCarInfoMap = (): Map<string, CarInfo> => {
    const dispatch = useDispatch();
    const _carInfoMap = useSelector(selectCarInfoMap);
    if (!_carInfoMap || _carInfoMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_LIST));
    }
    return _carInfoMap;
};
export const useCarBrandMap = (): Map<string, CarBrand> => {
    const dispatch = useDispatch();
    const _carBrandMap = useSelector(selectCarBrandMap);
    if (!_carBrandMap || _carBrandMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_BRAND_LIST));
    }
    return _carBrandMap;
};
export const useSortedCarBrands = (): CarBrand[] | null => {
    const _carBrandMap = useCarBrandMap();
    return useMemo(() => {
        if (_carBrandMap) {
            return sortCollections(_carBrandMap.toIndexedSeq().toArray(), 'name');
        }
        return null;
    }, [_carBrandMap]);
};
export const useCarModelMap = (): Map<string, CarModel> => {
    const dispatch = useDispatch();
    const _carModelMap = useSelector(selectCarModelMap);
    if (!_carModelMap || _carModelMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_BRAND_LIST));
    }
    return _carModelMap;
};
export const useSortedCarModels = (): CarModel[] | null => {
    const _carModelMap = useCarModelMap();
    return useMemo(() => {
        if (_carModelMap) {
            return sortCollections(_carModelMap.toIndexedSeq().toArray(), 'name');
        }
        return null;
    }, [_carModelMap]);
};
export const useCarGradeMap = (): Map<string, CarGrade> => {
    const dispatch = useDispatch();
    const _carGradeMap = useSelector(selectCarGradeMap);
    if (!_carGradeMap || _carGradeMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_BRAND_LIST));
    }
    return _carGradeMap;
};
export const useSortedCarGrades = (): CarGrade[] | null => {
    const _carGradeMap = useCarGradeMap();
    return useMemo(() => {
        if (_carGradeMap) {
            return sortCollections(_carGradeMap.toIndexedSeq().toArray(), 'name');
        }
        return null;
    }, [_carGradeMap]);
};
export const useCarInfo = (carId: string): CarInfo | undefined => {
    return useCarInfoMap()?.get(carId || '');
};
export const useCarGradeName = (gradeId: string | null | undefined): string | null | undefined => {
    return useCarGradeMap()?.get(gradeId || '')?.name;
};

export const useSearchCarBrandModelGrade = (searchText?: string | null | undefined): SearchCarBrandModelGradeResult[] => {
    const _carSortedBrands = useSortedCarBrands();
    const _carModelMap = useCarModelMap();
    const _carGradeMap = useCarGradeMap();
    const _allData: SearchCarBrandModelGradeResult[] = useMemo(() => {
        let _result: SearchCarBrandModelGradeResult[] = [];
        if (_carSortedBrands) {
            for (let _carBrandIndex = 0; _carBrandIndex < _carSortedBrands.length; _carBrandIndex++) {
                const _tempCarBrand: CarBrand = _carSortedBrands[_carBrandIndex];
                if (_tempCarBrand) {
                    _result.push({
                        combinedId: _tempCarBrand.id,
                        brandId: _tempCarBrand.id,
                        modelId: null,
                        gradeId: null,
                        label: _tempCarBrand.name
                    });
                    const _modelChildren: (CarModel | undefined)[] = sortCollections(_tempCarBrand.modelIdSet?.filter(_tempModelId => {
                        return !!_carModelMap?.get(_tempModelId);
                    }).toIndexedSeq()
                        .toArray()
                        .map(_tempModelId => {
                            return _carModelMap.get(_tempModelId);
                        }), 'name');
                    if (_modelChildren) {
                        for (let _modelIndex = 0; _modelIndex < _modelChildren.length; _modelIndex++) {
                            const _tempModel: CarModel | undefined = _modelChildren[_modelIndex];
                            if (_tempModel) {
                                _result.push({
                                    combinedId: `${_tempCarBrand.id}:${_tempModel.id}`,
                                    brandId: _tempCarBrand.id,
                                    modelId: _tempModel.id,
                                    gradeId: null,
                                    label: `${_tempCarBrand.name} - ${_tempModel.name}`
                                });
                                const _gradeChildren: (CarGrade | undefined)[] = sortCollections(_tempModel.gradeIdSet?.filter(_tempGradeId => {
                                    return !!_carGradeMap?.get(_tempGradeId);
                                }).toIndexedSeq().toArray().map(_tempGradeId => {
                                    return _carGradeMap.get(_tempGradeId);
                                }), 'name');
                                if (_gradeChildren) {
                                    for (let _gradeIndex = 0; _gradeIndex < _gradeChildren.length; _gradeIndex++) {
                                        const _tempGrade: CarGrade | undefined = _gradeChildren[_gradeIndex];
                                        if (_tempGrade) {
                                            _result.push({
                                                combinedId: `${_tempCarBrand.id}:${_tempModel.id}:${_tempGrade.id}`,
                                                brandId: _tempCarBrand.id,
                                                modelId: _tempModel.id,
                                                gradeId: _tempGrade.id,
                                                label: `${_tempCarBrand.name} - ${_tempModel.name} - ${_tempGrade.name}`
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return _result;
    }, [_carSortedBrands, _carModelMap, _carGradeMap]);
    return useMemo(() => {
        return filterSearch(_allData, 'label', searchText);
    }, [_allData, searchText]);
};
export const useCarEditor = (id: string): CarEditor | null | undefined => {
    return useSelector(selectCarEditorMap)?.get(id || '');
};

export const useCarUpdate = (id: string): CarEditor | null | undefined => {
    return useCarInfo(id)
};

export const useFullNameCarBrandModelGrade = (brandId: string | null | undefined, modelId: string | null | undefined, gradeId: string | null | undefined): string | null | undefined => {
    let _result;
    const _brandName = useCarBrandMap()?.get(brandId || '')?.name;
    const _modelName = useCarModelMap()?.get(modelId || '')?.name;
    const _gradeName = useCarGradeMap()?.get(gradeId || '')?.name;
    if (!isBlank(_brandName)) {
        _result = _brandName;
    }
    if (!isBlank(_modelName)) {
        if (!isBlank(_result)) {
            _result += ' - ';
        } else {
            _result = '';
        }
        _result += (_modelName || '');
    }
    if (!isBlank(_gradeName) && !_gradeName?.includes('unknown')) {
        if (!isBlank(_result)) {
            _result += ' - ';
        } else {
            _result = '';
        }
        _result += (_gradeName || '');
    }
    return _result;
};
export const useHasEditingCar = (carId: string = CAR_EDITOR_DEFAULT_ID): boolean => {
    const _carEditor = useCarEditor(carId)
    if (_carEditor && (
        _carEditor.carBrandId
        || _carEditor.carGradeId
        || _carEditor.carModelId
        || _carEditor.imageUrls
        || _carEditor.odo
        || _carEditor.plateNumber
        || _carEditor.relationship
        || _carEditor.vinNumber
    )) {
        return true
    }
    return false
}

export const useCarServiceHistory = (carId: string): ServiceHistory[] | null | undefined => {
    const _carInfo = useCarInfo(carId)
    if (_carInfo) {
        const { serviceHistory } = _carInfo
        if (serviceHistory && serviceHistory.size > 0) {
            return serviceHistory.valueSeq().toArray()
        }
    }
    return null
}

export const useCarBrandsDealerMap = (): Map<string, CarBrandDealer> | null | undefined => {
    const _carDealerMap = useSelector(selectCarBrandDealerMap);
    const dispatch = useDispatch()
    if (!_carDealerMap || _carDealerMap.size === 0) {
        dispatch(createAction(REQUEST_CAR_BRAND_DEALER))
    }
    return _carDealerMap;
}

export const useCarBrandsDealer = (): CarBrandDealer[] | null | undefined => {
    const _carDealerMap = useCarBrandsDealerMap();
    if (_carDealerMap && _carDealerMap.size > 0) {
        return _carDealerMap.valueSeq().toArray()
    }
    return null
}

export const useSearchCarBrandDealer = (searchText?: string | null | undefined): SearchCarBrandModelGradeResult[] => {
    const _carBrandDealer = useCarBrandsDealer()
    if (_carBrandDealer && _carBrandDealer.length > 0) {
        const _allData: SearchCarBrandModelGradeResult[] = _carBrandDealer.map((_car) => {
            return {
                combinedId: _car.key,
                brandId: _car.brandId,
                modelId: _car.modelId,
                gradeId: _car.gradeId,
                label: _car.value
            }
        })
        if (_allData && _allData.length > 0) {
            return filterSearch(_allData, 'label', searchText);
        }
    }
    return [];
};

export const useCarAvailTestDriveMap = (): Map<string, CarModelTestDrive> | null | undefined => {
    const _carAvailMap = useSelector(selectCarAvailTestDriveMap);
    const _updateTime = useSelector(selectCarAvailUpdateTime);
    const dispatch = useDispatch()
    if (!_carAvailMap || _carAvailMap.size === 0 || (Date.now() - _updateTime > TIME_DAY)) {
        dispatch(createAction(REQUEST_CAR_AVAIL_TEST_DRIVE))
    }
    return _carAvailMap;
}

export const useCarAvailTestDrive = (): CarModelTestDrive[] | null | undefined => {
    const _carAvail = useCarAvailTestDriveMap();
    if (_carAvail && _carAvail.size > 0) {
        return _carAvail.valueSeq().toArray()
    }
    return null
}

export const useSearchCarAvailTestDrive = (searchText?: string | null | undefined): SearchCarBrandModelGradeResult[] => {
    const _carAvail = useCarAvailTestDrive()
    if (_carAvail && _carAvail.length > 0) {
        const _allData: SearchCarBrandModelGradeResult[] = _carAvail.map((_car) => {
            return {
                combinedId: _car.id,
                brandId: _car.brandId,
                modelId: _car.modelId,
                gradeId: _car.gradeId,
                label: _car.name
            }
        })
        if (_allData && _allData.length > 0) {
            return filterSearch(_allData, 'label', searchText);
        }
    }
    return [];
};

export const useAccessoryMap = (): Map<string, Accessories> => {
    return useSelector(selectAccessoryMap)
};

export const useAccessoryWithCarId = (carId: string | number): Accessories | null | undefined => {
    const _result = useAccessoryMap().get(carId + '')
    const dispatch = useDispatch()
    getLastTimeFetch(LAST_TIME_FETCH_API_CONST.ACCESSORY_LIST + carId).then((carListLastedTime) => {
        const _overLastTime = isOverTimeFetch(carListLastedTime, TIME_DAY)
        if (!_result || _overLastTime) {
            dispatch(requestAccessory(carId + ''))
            setLastTimeFetch(LAST_TIME_FETCH_API_CONST.ACCESSORY_LIST + carId)
        }
    })
    return _result;
};
