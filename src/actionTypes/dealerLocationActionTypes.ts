import {DealerLocation} from "../types/modelTypes";
import {CBErrorType} from "../types/errors";

const PREFIX = 'DEALER_LOCATION_ACTION/';
export const REQUEST_DEALER_LOCATION_LIST = PREFIX + 'REQUEST_DEALER_LOCATION_LIST';
export const ERROR_DEALER_LOCATION_LIST = PREFIX + 'ERROR_DEALER_LOCATION_LIST';
export const UPDATE_DEALER_LOCATION_LIST = PREFIX + 'UPDATE_DEALER_LOCATION_LIST';
export const REQUEST_TEST_DRIVE_AVAIL_ACTION = PREFIX + 'REQUEST_TEST_DRIVE_AVAIL_ACTION';
export const RECEIVE_TEST_DRIVE_AVAIL_ACTION = PREFIX + 'RECEIVE_TEST_DRIVE_AVAIL_ACTION';

export interface UpdateDealerLocationListAction {
    type: typeof UPDATE_DEALER_LOCATION_LIST,
    dealerLocations: DealerLocation[] | null
}

export interface ErrorDealerLocationListAction {
    type: typeof ERROR_DEALER_LOCATION_LIST,
    error?: CBErrorType
}

export interface RequestLocationTestDrive {
    type: typeof REQUEST_TEST_DRIVE_AVAIL_ACTION,
    carId: string
}

export interface ReceiveLocationTestDrive {
    type: typeof RECEIVE_TEST_DRIVE_AVAIL_ACTION,
    locations: any[] | null | undefined
}

export type DealerLocationActionTypes =
    UpdateDealerLocationListAction
    | ErrorDealerLocationListAction
    | RequestLocationTestDrive
    | ReceiveLocationTestDrive;
