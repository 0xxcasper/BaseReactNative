import { CBErrorType } from './../types/errors';
import {ProductEnum} from "../types/productEnum";

const PREFIX = 'PRODUCT_ENUM/';
export const REQUEST_PRODUCT_ENUM = PREFIX + 'REQUEST_PRODUCT_ENUM';
export const RECEIVE_PRODUCT_ENUM = PREFIX + 'RECEIVE_PRODUCT_ENUM';

export interface RequestProductEnum {
    type: typeof REQUEST_PRODUCT_ENUM,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveProductEnum {
    type: typeof RECEIVE_PRODUCT_ENUM,
    productEnum: Map<string, ProductEnum> | null
}

export type ProductEnumActionTypes = RequestProductEnum | ReceiveProductEnum;
