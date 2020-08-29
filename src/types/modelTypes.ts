import { OrderedMap, Set, Map } from 'immutable';
import { CBErrorType } from "./errors";

export interface AuthStatus {
    action: string,
    error?: CBErrorType | null | undefined
}

export interface AuthResult {
    firebaseDocId: string | null | undefined,
    accessToken: string | null | undefined,
    refreshToken: string | null | undefined,
}

export interface Notification {
}

export interface EnumEntry {
    value: string,
    label: string,
    sortValue?: number,
}

export interface HomeBannerModel {
    id: string;
    image: string;
    imageThumb: string;
}