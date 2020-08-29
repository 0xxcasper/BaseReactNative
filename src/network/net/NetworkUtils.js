import CONST from "common/const";
import { AuthXKeys } from "Helpers";
const X_AUTH = AuthXKeys()

export default Object.freeze({
    get: function (header, url, body, callback, options = {}) {
        if (body != null) {
            const esc = encodeURIComponent;
            const query = Object.keys(body).map(k => esc(k) + "=" + body[k]).join("&");
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
});