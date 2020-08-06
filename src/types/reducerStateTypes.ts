import { Map } from 'immutable'
import {
    AuthStatus,
} from "./modelTypes";
import { CBErrorType } from "./errors";

export interface AllState {
    appState: AppStateType,
    authState: AuthStateType,
    homeState: HomeStateType,
}

export interface DataStatus {
    action: string,
    error?: CBErrorType,
    updateTime?: number,
}

export interface LocationInfo {
    latitude: number | null | undefined,
    longitude: number | null | undefined,
    lastUpdateTime: number,
}

export interface DevicePermission {
    type: string,
    status: string,
    setting?: any,
}

export interface AppStateType {
    currentAppState: string | null | undefined,
    fcmToken: string | null | undefined,
    devicePermissionMap: Map<string, DevicePermission>,
    location: LocationInfo | null | undefined,
    lastBackgroundTime: number,
    lastForegroundTime: number,
    installTime: number,
    /**
     * emailAnonymous
     * get notification list, 
     * login with device token will get this, 
     * just login with device token when first time open App
     */
    emailAnonymous: string | null | undefined,
    applicationBadge: number | null | undefined,
    isLoading: boolean
}

export interface AuthStateType {
    authenticated: boolean,
    phoneNumber: string | null | undefined,
    otp: string | null | undefined,
    userName: string | null | undefined,
    token: string | null | undefined,
    firebaseDocId?: string | null | undefined,
    status: AuthStatus | null | undefined,
    refreshToken: string | null | undefined,
}

export interface HomeStateType {}