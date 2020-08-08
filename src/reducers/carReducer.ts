import { CarEditor, CarBrandDealer } from './../types/modelTypes';
import { RESET_CAR_EDITOR, ResetCarEditor, RECEIVE_CAR_BRAND_DEALER, UpdateCarBrandDealer, UPDATE_CAR_AVAIL_TEST_DRIVE, UpdateCarAvailTestDrive, RECEIVE_ACCESSORY_MODEL, ReceiveAccessoryModel } from './../actionTypes/carActionTypes';
import { CarStateType } from "../types/reducerStateTypes";
import { Map, Set } from 'immutable';
import {
    CarActionTypes,
    SET_CAR_INFOS,
    SetCarInfosAction,
    UPDATE_CAR_BRANDS_FROM_API,
    UPDATE_CAR_EDITOR,
    UpdateCarBrandsFromApiAction,
    UpdateCarEditorAction
} from "../actionTypes/carActionTypes";
import { CarBrand, CarInfo, CarModel } from "../types/modelTypes";
import { CAR_EDITOR_DEFAULT_ID } from '../common/const';

const _emptyCarEditor: CarEditor = {
    id: CAR_EDITOR_DEFAULT_ID,
    carBrandId: null,
    carModelId: null,
    carGradeId: null,
    imageUrls: null,
    odo: null,
    plateNumber: null,
    registrationExpiredTimeMs: null,
    relationship: null,
    vinNumber: null,
}

const _initState: CarStateType = {
    carInfoMap: Map(),
    carBrandMap: Map(),
    carGradeMap: Map(),
    carModelMap: Map(),
    carEditorMap: Map(),
    carBrandDealerMap: Map(),
    carVailTestDriveMap: Map(),
    updateTimeCarTestDrive: 0,
    accessoryMap: Map()
};
const _updateCarBrandsFromApi = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _actions = action as UpdateCarBrandsFromApiAction;
    const _nowTime = Date.now();
    const {
        carBrandData
    } = _actions;
    if (carBrandData) {
        let {
            carBrandMap,
            carModelMap,
            carGradeMap,
        } = state;
        carBrandData.forEach((_carBrand: any) => {
            const {
                id,
                name,
                models
            } = _carBrand;
            const _brandId = id + '';
            let _modelSet = Set();
            if (models) {
                models.forEach((_carModel: any) => {
                    const {
                        grades,
                    } = _carModel;
                    let _gradeSet = Set();
                    if (grades) {
                        grades.forEach((_tempGrade: any) => {
                            const _gradeId = _tempGrade.id + '';
                            _gradeSet = _gradeSet.add(_gradeId);
                            carGradeMap = carGradeMap.set(_gradeId, {
                                id: _gradeId,
                                name: _tempGrade.name,
                                slug: _tempGrade.slug,
                                year: _tempGrade.year,
                                updateTime: _nowTime,
                            })
                        });
                    }
                    const _modelId = _carModel.id + '';
                    _modelSet = _modelSet.add(_modelId);
                    carModelMap = carModelMap.set(_modelId, {
                        id: _modelId,
                        name: _carModel.name,
                        slug: _carModel.slug,
                        gradeIdSet: _gradeSet,
                        updateTime: _nowTime,
                    })
                });
            }
            carBrandMap = carBrandMap.set(_brandId, {
                id: _brandId,
                modelIdSet: _modelSet,
                name: name,
                updateTime: _nowTime,
            });
        });
        state = {
            ...state,
            carBrandMap,
            carModelMap,
            carGradeMap,
        }
    }
    return state;
};

const _setCarInfos = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _actions = action as SetCarInfosAction;
    const {
        carInfos
    } = _actions;

    if (carInfos) {
        let {
            carInfoMap
        } = state;
        let _carInfoMap = Map<string, CarInfo>()
        carInfos.forEach((_userCar: CarInfo) => {
            _carInfoMap = _carInfoMap.set(_userCar.id, _userCar)
        });
        state = {
            ...state,
            carInfoMap: _carInfoMap
        }
    }
    return state;
};

const _updateCarEditor = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _action = action as UpdateCarEditorAction;
    const _nowTime = Date.now();
    const {
        carEditor
    } = _action;
    if (carEditor) {
        const {
            id
        } = carEditor;
        let {
            carEditorMap
        } = state;
        let _currentCarEditor = carEditorMap.get(id);
        if (!_currentCarEditor) {
            _currentCarEditor = {
                ...carEditor,
                startTimeMs: _nowTime,
                lastUpdateTimeMs: _nowTime
            }
        } else {
            _currentCarEditor = {
                ..._currentCarEditor,
                ...carEditor,
                lastUpdateTimeMs: _nowTime
            }
        }
        carEditorMap = carEditorMap.set(id, _currentCarEditor);
        state = {
            ...state,
            carEditorMap: carEditorMap,
        }
    }
    return state;
};

const _resetCarEditor = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _action = action as ResetCarEditor;
    const {
        carId
    } = _action;

    const _carId = carId || CAR_EDITOR_DEFAULT_ID

    if (_carId) {
        let {
            carEditorMap
        } = state;
        carEditorMap = carEditorMap.set(_carId, _emptyCarEditor)
        state = {
            ...state,
            carEditorMap: carEditorMap,
        }
    }
    return state;
}

const _updateCarBrandsDealer = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _action = action as UpdateCarBrandDealer;
    const {
        carBrands
    } = _action;
    let {
        carBrandDealerMap
    } = state
    if (carBrands) {
        carBrands.forEach((carBrand: CarBrandDealer) => {
            carBrandDealerMap = carBrandDealerMap.set(carBrand.key, carBrand)
        })
        state = {
            ...state,
            carBrandDealerMap
        }
    }
    return state;
}

const _updateCarAvailTestDrive = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _action = action as UpdateCarAvailTestDrive;
    const {
        carsAvail
    } = _action;

    let {
        carVailTestDriveMap
    } = state
    carVailTestDriveMap = Map()
    if (carsAvail && carsAvail.length > 0) {
        carsAvail.forEach((_carAvail) => {
            carVailTestDriveMap = carVailTestDriveMap.set(_carAvail.id, _carAvail)
        })
        state = {
            ...state,
            carVailTestDriveMap,
            updateTimeCarTestDrive: Date.now()
        }
    }
    return state;
}

const _updateAccessoryList = (state: CarStateType, action: CarActionTypes): CarStateType => {
    const _action = action as ReceiveAccessoryModel;
    const {
        carId,
        accessories
    } = _action;
    let { accessoryMap } = state
    accessoryMap = accessoryMap.set(carId + '', accessories)
    return {
        ...state,
        accessoryMap
    };
}

export default (state: CarStateType = _initState, action: CarActionTypes): CarStateType => {
    switch (action.type) {
        case UPDATE_CAR_BRANDS_FROM_API:
            return _updateCarBrandsFromApi(state, action);
        case SET_CAR_INFOS:
            return _setCarInfos(state, action);
        case UPDATE_CAR_EDITOR:
            return _updateCarEditor(state, action);
        case RESET_CAR_EDITOR:
            return _resetCarEditor(state, action);
        case RECEIVE_CAR_BRAND_DEALER:
            return _updateCarBrandsDealer(state, action);
        case UPDATE_CAR_AVAIL_TEST_DRIVE:
            return _updateCarAvailTestDrive(state, action);
        case RECEIVE_ACCESSORY_MODEL:
            return _updateAccessoryList(state, action);
    }
    return state;
}
export const carStateToJs = (state: CarStateType): any => {
    const {
        carBrandMap,
        carModelMap,
        carGradeMap,
        carInfoMap,
        carEditorMap,
        carBrandDealerMap,
        carVailTestDriveMap,
        updateTimeCarTestDrive,
        accessoryMap
    } = state;
    return {
        carBrandMap: carBrandMap.map((_carBrand) => {
            const {
                modelIdSet
            } = _carBrand;
            return {
                ..._carBrand,
                modelIdSet: modelIdSet?.toArray(),
            }
        }).toObject(),
        carModelMap: carModelMap.map((_carMode) => {
            const {
                gradeIdSet
            } = _carMode;
            return {
                ..._carMode,
                gradeIdSet: gradeIdSet?.toArray(),
            }
        }).toObject(),
        carGradeMap: carGradeMap.toObject(),
        carEditorMap: carEditorMap.toObject(),
        carBrandDealerMap: carBrandDealerMap.toObject(),
        carVailTestDriveMap: carVailTestDriveMap.toObject(),
        updateTimeCarTestDrive,
        accessoryMap: accessoryMap.toObject()
    }
};
export const carStateFromJs = (state: any): CarStateType => {
    const {
        carBrandMap,
        carModelMap,
        carGradeMap,
        carInfoMap,
        carEditorMap,
        carBrandDealerMap,
        carVailTestDriveMap,
        updateTimeCarTestDrive, 
        accessoryMap
    } = state;
    return {
        ..._initState,
        carBrandMap: Map<string, any>(carBrandMap).map((_carBrand: any): CarBrand => {
            const {
                modelIdSet
            } = _carBrand;
            return {
                ..._carBrand,
                modelIdSet: Set(modelIdSet),
            }
        }),
        carModelMap: Map<string, any>(carModelMap).map((_carMode: any): CarModel => {
            const {
                gradeIdSet
            } = _carMode;
            return {
                ..._carMode,
                gradeIdSet: Set(gradeIdSet),
            }
        }),
        carGradeMap: Map(carGradeMap),
        carEditorMap: Map(carEditorMap),
        carBrandDealerMap: Map(carBrandDealerMap),
        carVailTestDriveMap: Map(carVailTestDriveMap),
        updateTimeCarTestDrive,
        accessoryMap: Map(accessoryMap)
    }
};
