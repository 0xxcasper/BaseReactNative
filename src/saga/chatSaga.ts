import {ChatBuilder} from '../builders';
import {requestConversationById, updateStateConversationSupport} from 'actions/chatAction';
import {selectChatUserId, selectChatUserToken} from 'selectors/accountSelectors';
import {updateChatUser} from 'actions/accountActions';
import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {TIME_DAY} from "common/const";
import {
    getChatSupport as getChatSupportApi,
    getChatUser as getChatUserApi,
    requestConversationsChat,
    requestLoginChat,
    uploadFileChatApi
} from './../network/index';
import {
    GET_CONVERSATION_SUPPORT,
    LOGIN_CHAT,
    MAKE_CONVERSATION_WITH_PARAMS,
    REQUEST_CONVERSATION_CHAT,
    UPLOAD_FILE_CHAT_ACTION
} from 'actionTypes/chatActionTypes';

const _EXPIRE_DATA_TIME = TIME_DAY * 3;
function* _loginChatUser() {
    // yield put(setAppLoadingAction(true))
    try {
        const chatToken = yield select(selectChatUserToken)
        const _result = yield requestLoginChat({
            method: "POST",
            token: chatToken
        })
        if (_result) {
            yield put(updateChatUser(_result))
            // yield put(setAppLoadingAction(false))
            yield put(requestConversationById(null, _result.token))
        }
    } catch (error) {
        // yield put(setAppLoadingAction(false))
    }
}

function* _requestConversationChat(action: any) {
    const {
        conversationId,
        tokenChat
    } = action
    try {
        const _tokenChatFromData = yield select(selectChatUserToken)
        const _userChatId = yield select(selectChatUserId)
        let _chatToken = tokenChat
        if (!_chatToken) {
            _chatToken = _tokenChatFromData
        }
        const _result = yield requestConversationsChat({
            method: "GET",
            token: _chatToken,
            conversationId: conversationId
        })
        if (_result && _result.length > 0) {
            if (conversationId) return;
            const _data = _result[0]
            yield put(updateStateConversationSupport({
                ..._data,
                id: _data._id,
                logs: ChatBuilder.convertConversationLogs(_data.logs, _userChatId)
            }))
        }
        // yield put(setAppLoadingAction(false))

    } catch (error) {
        // yield put(setAppLoadingAction(false))
    }
}

function* _makeConversationWithParams(action: any) {
    const {
        params,
        tokenChat,
        resolve,
        reject
    } = action
    try {
        const _tokenChatFromData = yield select(selectChatUserToken)
        let _chatToken = tokenChat
        if (!_chatToken) {
            _chatToken = _tokenChatFromData
        }
        const _result = yield getChatUserApi(
            ChatBuilder.paramsMakeConversation(params), {
            method: "POST",
            token: _chatToken,
        })
        yield put(updateChatUser(_result))
        resolve && resolve(_result)
    } catch (error) {
        reject && reject({
            code: 500,
            message: error.message ? error.message : error
        })
    }
}

function* _getConversationSupport(action: any) {
    const {
        tokenChat,
        resolve,
        reject
    } = action
    try {
        const _tokenChatFromData = yield select(selectChatUserToken)
        const _userChatId = yield select(selectChatUserId)
        let _chatToken = tokenChat
        if (!_chatToken) {
            _chatToken = _tokenChatFromData
        }
        const _result = yield getChatSupportApi({
            method: "GET",
            token: _chatToken,
        })
        yield put(updateStateConversationSupport({
            ..._result,
            id: _result._id,
            logs: ChatBuilder.convertConversationLogs(_result.logs, _userChatId)
        }))
        resolve && resolve(_result)
    } catch (error) {
        reject && reject({
            code: 500,
            message: error.message ? error.message : error
        })
    }
}

function* _uploadFileChat(action: any) {
    const {
        formData,
        resolve,
        reject
    } = action
    try {
        const _token = yield select(selectChatUserToken)
        const _result = yield uploadFileChatApi(formData, {
            token: _token,
        })
        if(_result) {
            resolve && resolve(_result)
        }
    } catch (error) {
        reject && reject({
            code: 500,
            message: error.message ? error.message : error
        })
    }
}

function* watchLoginChatUser() {
    yield takeLatest(LOGIN_CHAT, _loginChatUser);
}

function* watchConversationChat() {
    yield takeLatest(REQUEST_CONVERSATION_CHAT, _requestConversationChat);
}
function* watchMakeConversation() {
    yield takeLatest(MAKE_CONVERSATION_WITH_PARAMS, _makeConversationWithParams);
}

function* watchConversationSupport() {
    yield takeLatest(GET_CONVERSATION_SUPPORT, _getConversationSupport);
}

function* watchUploadFileChat() {
    yield takeLatest(UPLOAD_FILE_CHAT_ACTION, _uploadFileChat);
}


export default function* () {
    yield all([
        fork(watchLoginChatUser),
        fork(watchConversationChat),
        fork(watchMakeConversation),
        fork(watchConversationSupport),
        fork(watchUploadFileChat)
    ]);
}
