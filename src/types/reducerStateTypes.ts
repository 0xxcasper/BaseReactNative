import { Map } from 'immutable'
import {
    AuthStatus,
} from "./modelTypes";
import { CBErrorType } from "./errors";

export interface AllState {
    /*life circle your app*/
    appState: AppStateType,

    /*Authentication of client
    *Device token | FCM token | token | refresh token
    **/
    authState: AuthStateType,

    /*
    * storage user info
    * userName | phoneNumber | email....
    * */
    accountState: AccountStateType,

    /*storage home state*/
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
    devicePermissionMap?: Map<string, DevicePermission>,
    lastBackgroundTime: number,
    lastForegroundTime: number,
    installTime: number,
    applicationBadge: number | null | undefined,
    isLoading: boolean
}

export interface AuthStateType {
    authenticated: boolean,
    fcmToken: string | null | undefined,
    phoneNumber: string | null | undefined,
    userName: string | null | undefined,
    token: string | null | undefined,
    status: AuthStatus | null | undefined,
    refreshToken: string | null | undefined,
}

export interface AccountStateType {
}

export interface HomeStateType {}