import { useSelector } from "react-redux";
import { selectConversationSupport } from './../selectors/chatSelectors';
import { ConversationSupportModel, ConversationLogModel } from './../types/modelTypes';

export const useConversationSupport = (): ConversationSupportModel | null | undefined => {
    return useSelector(selectConversationSupport)
};

export const useConversationSupportId = (): string | null | undefined => {
    return useConversationSupport()?.id
};

export const useConversationLogs = (): ConversationLogModel[] | null | undefined => {
    return useConversationSupport()?.logs
};

export const useIsHasConversations = (): boolean => {
    const _conversation = useConversationLogs()
    if(_conversation && _conversation.length > 0) {
        return true
    }
    return false
};