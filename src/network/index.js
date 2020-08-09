import EventEmitter from 'eventemitter3';
import CONST from 'common/const';
import ServerPath from './net/ServerPath';
import store from "redux/store";


export const networkEmitter = new EventEmitter();

const requestApi = (api, header = {}, url, body, options = {}) => {
    const {
        hasMeta,
        hideHeader
    } = options
    return new Promise((resolve, reject) => {
        const state = store.getState();
        // const _fcmToken = selectFcmToken(state);
        // const _accessToken = selectToken(state);
        if (_accessToken) {
            header = {
                ...header,
                // Authorization: `Bearer ${_accessToken}`,
            };
        }
        if (_fcmToken) {
            header = {
                ...header,
                "tracking-id": _fcmToken
            };
        }
        api(header, url, body, (status, response) => {
            console.log('METHOD', api.name);
            console.log('API: ', url);
            console.log('HEADER: ', header);
            console.log('BODY: ', body);
            console.log('RESPONSE: ', response);

            switch (status) {
                case CONST.SUCCESS: {
                    const { code, status_code, data, meta } = response;
                    if (status_code != null &&
                        status_code !== CONST.API_CODE_OK &&
                        status_code !== CONST.API_CODE_OK_200) {
                        reject(response);
                    }
                    else if (data && meta) {
                        if (hasMeta) {
                            resolve(response, meta)
                        } else {
                            resolve(response)
                        }
                    }
                    else if (data) {
                        resolve(data);
                        return
                    } else {
                        resolve(response);
                    }
                }
                    break;
                case CONST.TOKEN_ERROR:
                    networkEmitter.emit(CONST.TOKEN_ERROR, {
                        response: response,
                    });
                    reject(response);
                    break;
                default:
                    reject(response);
                    break;
            }
        }, options);
    });
};
