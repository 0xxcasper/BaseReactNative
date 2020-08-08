import { ChatStateType } from './../types/reducerStateTypes';
import { CarBrandDealer, CarModelTestDrive, ConversationSupportModel } from './../types/modelTypes';
import {AllState, CarStateType} from "../types/reducerStateTypes";
import {Map} from 'immutable';
import {CarBrand, CarEditor, CarGrade, CarInfo, CarModel} from "../types/modelTypes";
import { Accessories } from '../types/newCarModelTypes';

const selectChatState = (state: AllState): ChatStateType => {
    return state?.chatState;
};
export const selectConversationSupport = (state: AllState): ConversationSupportModel | null | undefined => {
    return selectChatState(state)?.conversationSupport;
};