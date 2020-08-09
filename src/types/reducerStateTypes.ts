import { Map } from 'immutable'
import {AuthStatus} from "types/modelTypes";
import {CBErrorType} from "types/errors";

export interface AllState {
    /*
    * Life circle your app
    * Device token | FCM token |
    */
    appState: AppStateType,

    /*
    * Authentication of client
    * token | refresh token | isLogin
    **/
    authState: AuthStateType,

    /*
    * Storage user info
    * userName | phoneNumber | email....
    * */
    accountState: AccountStateType,

    /*Storage home state*/
    homeState: HomeStateType,
}

export interface DataStatus {
    action: string,
    error?: CBErrorType,
    updateTime?: number,
}

export interface DevicePermission {
    type: string,
    status: string,
    setting?: any,
}

export interface AppStateType {
    fcmToken: string | null | undefined,
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
    phoneNumber: string | null | undefined,
    userName: string | null | undefined,
    token: string | null | undefined,
    status: AuthStatus | null | undefined,
    refreshToken: string | null | undefined,
}

export interface AccountStateType {
}

export interface HomeStateType {}