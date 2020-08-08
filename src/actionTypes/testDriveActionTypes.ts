import { CBErrorType } from './../types/errors';
import { TestDriveInfoModel } from './../types/modelTypes';

const PREFIX = 'TEST_DRIVE/';
export const UPDATE_USER_REGISTER_TEST_DRIVE = PREFIX + 'UPDATE_USER_REGISTER_TEST_DRIVE';
export const MAKE_BOOKING_TEST_DRIVE = PREFIX + 'MAKE_BOOKING_TEST_DRIVE';
export const UPDATE_USER_INFO = PREFIX + 'UPDATE_USER_INFO';

export interface UpdateUserRegisterTestDrive {
    type: typeof UPDATE_USER_REGISTER_TEST_DRIVE,
    registerInfo: TestDriveInfoModel
}

export interface MakeBookingTestDrive {
    type: typeof MAKE_BOOKING_TEST_DRIVE,
    resolve: (result: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export type TestDriveActionTypes =
    UpdateUserRegisterTestDrive
    | MakeBookingTestDrive;