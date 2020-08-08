import { CBErrorType } from './../types/errors';
import {CostEstimate, Location, Province} from "../types/modelTypes";

const PREFIX = 'COST_ESTIMATE/';
export const RECEIVE_COST_ESTIMATE_LOCATIONS = PREFIX + 'RECEIVE_LOCATIONS';
export const REQUEST_COST_ESTIMATE_LOCATIONS = PREFIX + 'REQUEST_LOCATIONS';
export const REQUEST_PROVINCES = PREFIX + 'REQUEST_PROVINCES';
export const RECEIVE_PROVINCES = PREFIX + 'RECEIVE_PROVINCES';
export const RECEIVE_COST_ESTIMATE = PREFIX + 'RECEIVE_COST_ESTIMATE';
export const CALCULATE_COST_ESTIMATE = PREFIX + 'CALCULATE_COST_ESTIMATE';
export const RECEIVE_CALCULATE_COST_ESTIMATE = PREFIX + 'RECEIVE_CALCULATE_COST_ESTIMATE';

export interface ReceiveLocations {
    type: typeof RECEIVE_COST_ESTIMATE_LOCATIONS,
    locations: Map<string, Location> | null,
}

export interface RequestLocation {
    type: typeof REQUEST_COST_ESTIMATE_LOCATIONS
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface RequestProvinces {
    type: typeof REQUEST_PROVINCES,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface ReceiveProvinces {
    type: typeof RECEIVE_PROVINCES,
    provinces: Map<string, Province> | null
}

export interface ReceiveCostEstimateInput {
    type: typeof RECEIVE_COST_ESTIMATE,
    costEstimate: CostEstimate
}

export interface ReceiveCalculateCostEstimate {
    type: typeof RECEIVE_CALCULATE_COST_ESTIMATE,
    costEstimate: CostEstimate
}

export type CostEstimateActionTypes = ReceiveLocations | RequestLocation | RequestProvinces | ReceiveProvinces | ReceiveCostEstimateInput | ReceiveCalculateCostEstimate;
