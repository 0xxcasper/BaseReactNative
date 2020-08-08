import { CBErrorType } from './../types/errors';
import {InsuranceRate} from "../types/modelTypes";

const PREFIX = 'INSURANCE/';
export const RECEIVE_INSURANCE_RATE = PREFIX + 'RECEIVE_INSURANCE_RATE';
export const REQUEST_INSURANCE_RATE = PREFIX + 'REQUEST_INSURANCE_RATE';

export interface ReceiveInsuranceRate {
    type: typeof RECEIVE_INSURANCE_RATE,
    insuranceRate: Map<string, InsuranceRate> | null | undefined,
}

export interface RequestInsuranceRate {
    type: typeof REQUEST_INSURANCE_RATE,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export type InsuranceActionTypes = ReceiveInsuranceRate | RequestInsuranceRate;
