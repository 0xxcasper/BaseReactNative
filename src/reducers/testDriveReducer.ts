import { TestDriveActionTypes, UpdateUserRegisterTestDrive, UPDATE_USER_REGISTER_TEST_DRIVE } from './../actionTypes/testDriveActionTypes';
import { TestDriveInfoModel } from './../types/modelTypes';
import { TestDriveStateType } from './../types/reducerStateTypes';
import _ from 'lodash'

const _initRegisterInfo: TestDriveInfoModel = {
    name: '',
    phone: '',
    age: '',
    gender: '',
    carGradeId: null,
    carBrandId: null,
    carModelId: null,
    location: '',
    time: ''
}
const _initState: TestDriveStateType = {
    registerInfo: _initRegisterInfo
};

const _updateRegisterTestDriveInfo = (state: TestDriveStateType, action: TestDriveActionTypes): TestDriveStateType => {
    const _action = action as UpdateUserRegisterTestDrive;
    const {
        registerInfo
    } = _action;
    const _registerInfo = state.registerInfo
    const _value = {
        ...state,
        registerInfo: Object.assign(_.cloneDeep(_registerInfo), _.cloneDeep(registerInfo))
    };
    return _value
};

export default (state = _initState, action: TestDriveActionTypes): TestDriveStateType => {
    switch (action.type) {
        case UPDATE_USER_REGISTER_TEST_DRIVE:
            return _updateRegisterTestDriveInfo(state, action);
        default:
    }
    return state;
}
