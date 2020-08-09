import RNFetchBlob from "rn-fetch-blob";
import CONST from "common/const";
import { AuthXKeys } from "../../helpers";
import AppConfig from 'react-native-config';
import { Platform } from "react-native";
const X_AUTH = AuthXKeys()

export default Object.freeze({
    get: function (header, url, body, callback, options = {}) {
        if (body != null) {
            var esc = encodeURIComponent;
            var query = Object.keys(body).map(k => esc(k) + "=" + body[k]).join("&");
            url += "?" + query;
        }
        const { hideHeader } = options
        let _header;
        if (hideHeader) {
            _header = null
        } else {
            _header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...X_AUTH,
                ...header
            }
        }
        fetch(url, {
            method: "GET",
            headers: _header,
            body: null
        })
            .then(response => response.json())
            .then(responseJson => {
                callback(CONST.SUCCESS, responseJson);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    post: function (header, url, body, callback, options = {}) {
        const { hideHeader } = options
        let _header;
        if (hideHeader) {
            _header = null
        } else {
            _header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...X_AUTH,
                ...header
            }
        }
        fetch(url, {
            method: "POST",
            headers: _header,
            body: JSON.stringify(body)
        })
            .then(response => {
                return response.json()
            })
            .then(responseJson => {
                callback(CONST.SUCCESS, responseJson);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    put: function (header, url, body, callback, options = {}) {
        const { hideHeader } = options
        let _header;
        if (hideHeader) {
            _header = null
        } else {
            _header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...X_AUTH,
                ...header
            }
        }
        fetch(url, {
            method: "PUT",
            headers: _header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                callback(CONST.SUCCESS, responseJson);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    delete: function (header, url, body, callback, options = {}) {
        const { hideHeader } = options
        let _header;
        if (hideHeader) {
            _header = null
        } else {
            _header = {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...X_AUTH,
                ...header
            }
        }
        fetch(url, {
            method: "DELETE",
            headers: _header,
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(responseJson => {
                callback(CONST.SUCCESS, responseJson);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    download: function (header, url, body, callback, options = {}) {
        // send http request in a new thread (using native code)
        const { 
            fileName, 
            method
        } = options
        let date = new Date();
        let subName = date.getTime();
        let _filePath = null
        if(Platform.OS === "android") {
            _filePath = RNFetchBlob.fs.dirs.DownloadDir + fileName + subName + '.pdf'
        }
        RNFetchBlob.config({
            fileCache: true,
            path: _filePath,
            appendExt: 'pdf'
        }).fetch(
            method || "POST",
            url,
            {
                Accept: "application/json",
                "Content-Type": "application/json",
                ...X_AUTH,
                ...header
            })
            .then(response => {
                return response.respInfo
            })
            .then(respInfo => {
                callback(CONST.SUCCESS, respInfo);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    chat: function (header, url, body, callback, options = {}) {
        const {
            method,
            token
        } = options
        RNFetchBlob.fetch(
            method,
            url,
            {
                ...header,
                "seller": AppConfig.SUFFIX_DEALER_SLUG,
                token: token,
            },
            JSON.stringify(body)
        )
            .then(response => {
                return response.data
            })
            .then(respData => {
                callback(CONST.SUCCESS, JSON.parse(respData));
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
    uploadFileChat: function (header, url, body, callback, options = {}) {
        const {
            token
        } = options

        const _header = {
            seller: AppConfig.SUFFIX_DEALER_SLUG,
            token: token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            ...header
        }
        fetch(url, {
            method: "POST",
            headers: _header,
            body: body
        })
            .then(response => response.json())
            .then(responseJson => {
                callback(CONST.SUCCESS, responseJson);
            })
            .catch(error => {
                callback(CONST.FAILURE, error);
            });
    },
});