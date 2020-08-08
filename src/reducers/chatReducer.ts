import {
    ChatActionTypes, CLEAR_CONVERSATION_LOGOUT,
    UPDATE_CONVERSATION_SUPPORT,
    UPDATE_MESSAGE_LOGS,
    UpdateConversationSupport,
    UpdateMessageLogs
} from 'actionTypes/chatActionTypes';
import {ChatStateType} from 'types/reducerStateTypes';
import utils from "common/utils";
import {LOCAL_STORAGE_KEY} from "common/const";

const _initState: ChatStateType = {
    conversationSupport: null
};

const _updateStateConversationSupport = (state: ChatStateType, action: ChatActionTypes): ChatStateType => {
    const _action = action as UpdateConversationSupport;
    const {
        conversationSupport
    } = _action;
    return {
        ...state,
        conversationSupport
    };
}

const _updateMessageLogs = (state: ChatStateType, action: ChatActionTypes): ChatStateType => {
    const _action = action as UpdateMessageLogs;
    const {
        message
    } = _action;
    let {
        conversationSupport
    } = state
    if(conversationSupport) {
        conversationSupport = {
            ...conversationSupport!,
            logs: conversationSupport!.logs.concat(message)
        }
    }
    return {
        ...state,
        conversationSupport    
    };
}

const _clearConversationsWhenLogout = (state: ChatStateType, action: ChatActionTypes): ChatStateType => {
    utils.setValueByKey(LOCAL_STORAGE_KEY.HAS_CONVERSATION, JSON.stringify(false))
    return {
        ...state,
        conversationSupport: null
    };
}

export default (state: ChatStateType = _initState, action: ChatActionTypes): ChatStateType => {
    switch (action.type) {
        case UPDATE_CONVERSATION_SUPPORT:
            return _updateStateConversationSupport(state, action);
        case UPDATE_MESSAGE_LOGS:
            return _updateMessageLogs(state, action);
        case CLEAR_CONVERSATION_LOGOUT:
            return _clearConversationsWhenLogout(state, action);
    }
    return state;
}
