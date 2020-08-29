import {CBErrorType} from "types/errors";
import {HomeBannerModel} from "types/modelTypes";
const PREFIX = 'HOME_ACTION/';

export const REQUEST_HOME_BANNER = PREFIX + "REQUEST_HOME_BANNER";
export const RECEIVE_HOME_BANNER = PREFIX + "RECEIVE_HOME_BANNER";

export interface RequestHomeBannerAction {
    type: typeof REQUEST_HOME_BANNER,
    resolve?: () => void,
    reject?: (error?: CBErrorType | null | undefined) => void
}

export interface ReceiveHomeBannerAction {
    type: typeof RECEIVE_HOME_BANNER,
    banners: HomeBannerModel[]
}

export type HomeActionTypes =
    RequestHomeBannerAction
    | ReceiveHomeBannerAction;