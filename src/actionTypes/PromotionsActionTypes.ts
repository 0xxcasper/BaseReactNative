import {Promotion} from "../types/modelTypes";

const PREFIX = 'HOME_ACTION/';
export const REQUEST_PROMOTIONS = PREFIX + 'REQUEST_PROMOTIONS';
export const RECEIVE_PROMOTIONS = PREFIX + 'RECEIVE_PROMOTIONS';
export const RESET_PROMOTIONS = PREFIX + 'RESET_PROMOTIONS';
export const DID_RESET_PROMOTIONS = PREFIX + 'DID_RESET_PROMOTIONS';
export const ERROR_PROMOTIONS = PREFIX + 'ERROR_PROMOTIONS';

export interface UpdatePromotionsAction {
    type: typeof RECEIVE_PROMOTIONS,
    promotions: Promotion[] | null | undefined,
}

export interface ResetPromotionsAction {
    type: typeof RESET_PROMOTIONS,
}
export type PromotionActionTypes = UpdatePromotionsAction | ResetPromotionsAction;
