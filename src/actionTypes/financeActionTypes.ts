import { CBErrorType } from './../types/errors';

const PREFIX = 'FINANCE/';
export const RECEIVE_TFS_FINANCE = PREFIX + 'RECEIVE_TFS_FINANCE';
export const REQUEST_TFS_FINANCE = PREFIX + 'REQUEST_TFS_FINANCE';
export const UPDATE_TFS_FINANCE = PREFIX + 'UPDATE_TFS_FINANCE';
export const GET_TFS_DETAIL_FINANCE = PREFIX + 'GET_TFS_DETAIL_FINANCE';
export const SET_TFS_DETAIL_FINANCE = PREFIX + 'SET_TFS_DETAIL_FINANCE';

export interface ReceiveTFSFinance {
    type: typeof RECEIVE_TFS_FINANCE,
    tfsFinance: [] | null | undefined,
}

export interface RequestTFSFinance {
    type: typeof REQUEST_TFS_FINANCE,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void,
}

export interface UpdateTFSFinance {
    type: typeof UPDATE_TFS_FINANCE,
    tfsFinanceUpdate: {} | null | undefined
}

export interface GetTFSDetailFinance {
    type: typeof GET_TFS_DETAIL_FINANCE,
    tfsInput: {} | null | undefined,
    resolve: () => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface SetTFSDetailFinance {
    type: typeof SET_TFS_DETAIL_FINANCE,
    tfsDetail: [] | null | undefined
}

export type FinanceActionTypes = ReceiveTFSFinance | RequestTFSFinance | UpdateTFSFinance | GetTFSDetailFinance | SetTFSDetailFinance;
