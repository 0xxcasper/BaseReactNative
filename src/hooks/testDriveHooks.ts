import { useSelector } from "react-redux";
import { selectTestDriveRegisterInfo } from './../selectors/testDriveSelectors';
import { TestDriveInfoModel } from './../types/modelTypes';

export const useTestDriveRegisterInfo = (): TestDriveInfoModel => {
    return useSelector(selectTestDriveRegisterInfo);
};