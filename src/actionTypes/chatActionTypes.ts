import {CBErrorType} from 'types/errors';

const PREFIX = 'CHAT/';
export const LOGIN_CHAT = PREFIX + 'LOGIN_CHAT';
export const REQUEST_CONVERSATION_CHAT          = PREFIX + 'REQUEST_CONVERSATION_CHAT';
export const MAKE_CONVERSATION_WITH_PARAMS      = PREFIX + 'MAKE_CONVERSATION_WITH_PARAMS';
export const GET_CONVERSATION_SUPPORT           = PREFIX + 'GET_CONVERSATION_SUPPORT';
export const UPDATE_CONVERSATION_SUPPORT        = PREFIX + 'UPDATE_CONVERSATION_SUPPORT';
export const UPLOAD_FILE_CHAT_ACTION            = PREFIX + 'UPLOAD_FILE_CHAT_ACTION';
export const UPDATE_MESSAGE_LOGS                = PREFIX + 'UPDATE_MESSAGE_LOGS';
export const CLEAR_CONVERSATION_LOGOUT          = PREFIX + 'CLEAR_CONVERSATION_LOGOUT';

export interface RequestLoginChat {
    type: typeof LOGIN_CHAT,
}

export interface RequestConversationById {
    type: typeof REQUEST_CONVERSATION_CHAT,
    conversationId: string | null | undefined,
    tokenChat: string | null | undefined
}

export interface MakeConversationWithParams {
    type: typeof MAKE_CONVERSATION_WITH_PARAMS,
    params: any,
    tokenChat: string | null | undefined
    resolve: (result?: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface GetConversationSupport {
    type: typeof GET_CONVERSATION_SUPPORT,
    tokenChat: string | null | undefined
    resolve: (result?: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface UpdateConversationSupport {
    type: typeof UPDATE_CONVERSATION_SUPPORT,
    conversationSupport: any
}
export interface UploadFileChat {
    type: typeof UPLOAD_FILE_CHAT_ACTION,
    formData: any,
    resolve: (result?: any | null | undefined) => void,
    reject: (error?: CBErrorType | null | undefined) => void
}

export interface UpdateMessageLogs {
    type: typeof UPDATE_MESSAGE_LOGS,
    message: any
}

export type ChatActionTypes =
    RequestLoginChat
    | RequestConversationById
    | MakeConversationWithParams
    | GetConversationSupport
    | UpdateConversationSupport
    | UploadFileChat
    | UpdateMessageLogs;
