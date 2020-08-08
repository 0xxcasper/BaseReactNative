import { TestDriveInfoModel } from './../types/modelTypes';
import { TestDriveStateType } from './../types/reducerStateTypes';
import {AllState, PromotionStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import { Promotion } from "../types/modelTypes";

const selectTestDriveState = (state: AllState): TestDriveStateType => {
    return state.testDriveState;
};

export const selectTestDriveRegisterInfo = (state: AllState): TestDriveInfoModel => {
    return selectTestDriveState(state).registerInfo;
};