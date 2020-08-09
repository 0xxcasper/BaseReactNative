import Const from "common/const";
import NetworkUtils from "./NetworkUtils";
import SplashRepository from "network/repository/SplashRepository";
import Utils from "common/utils";
const CallType = {
  POST: "POST",
  POST_AVATAR: "POST_AVATAR",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE",
  GET_BLOB: "GET_BLOB"
};

function checkData(header, url, body, status, responseJson, call_type, callback) {
  if (responseJson.code == Const.TOKEN_ERROR) {
    Utils.getValueByKey(Const.REFRESH_TOKEN_STORE_ID).then(result => {
      if (result !== "" && result !== undefined && result !== null) {
        SplashRepository.doRefresh(
          {
            Authorization: "Bearer " + result
          },
          function(RFstatus, RFresponseJson) {
            if (RFstatus == Const.SUCCESS) {
              if (RFresponseJson.code == Const.API_CODE_OK) {
                Utils.setValueByKey(
                  Const.USER_PROFILE,
                  JSON.stringify(RFresponseJson.data.userProfile)
                );
                Utils.setValueByKey(
                  Const.ACCESS_TOKEN_STORE_ID,
                  JSON.stringify(RFresponseJson.data.access_token)
                );
                Utils.setValueByKey(
                  Const.REFRESH_TOKEN_STORE_ID,
                  JSON.stringify(RFresponseJson.data.refresh_token)
                );
                header.Authorization = "Bearer " + RFresponseJson.data.access_token;
                /// Recall Api
                switch (call_type) {
                  case CallType.POST:
                    NetworkUtils.post(header, url, body, callback);
                    break;
                  case CallType.POST_AVATAR:
                    NetworkUtils.postAvatar(header, url, body, callback);
                    break;
                  case CallType.PUT:
                    NetworkUtils.put(header, url, body, callback);
                    break;
                  case CallType.GET:
                    NetworkUtils.get(header, url, body, callback);
                    break;
                  case CallType.DELETE:
                    NetworkUtils.delete(header, url, body, callback);
                    break;
                  case CallType.GET_BLOB:
                    NetworkUtils.getBlob(header, url, body, callback);
                    break;
                }
              } else {
                callback(Const.TOKEN_ERROR, RFresponseJson);
              }
            } else {
              callback(status, RFresponseJson);
            }
          }
        );
      } else {
        callback(Const.TOKEN_ERROR, responseJson);
      }
    });
  } else {
    callback(status, responseJson);
  }
}

function firstRequest(header, url, body, call_type, callback) {
  Utils.getValueByKey(Const.ACCESS_TOKEN_STORE_ID).then(result => {
    if (result !== "" && result !== undefined && result !== null) {
      if (header != null) {
        header.Authorization = "Bearer " + result;
      } else {
        header = { Authorization: "Bearer " + result };
      }
      switch (call_type) {
        case CallType.POST:
          NetworkUtils.post(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
        case CallType.POST_AVATAR:
          NetworkUtils.postAvatar(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
        case CallType.PUT:
          NetworkUtils.put(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
        case CallType.GET:
          NetworkUtils.get(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
        case CallType.DELETE:
          NetworkUtils.delete(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
        case CallType.GET_BLOB:
          NetworkUtils.getBlob(header, url, body, function(status, responseJson) {
            checkData(header, url, body, status, responseJson, call_type, callback);
          });
          break;
      }
    } else {
      callback(Const.TOKEN_ERROR, null);
    }
  });
}

export default Object.freeze({
  get: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.GET, callback);
  },
  post: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.POST, callback);
  },
  postAvatar: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.POST_AVATAR, callback);
  },
  put: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.PUT, callback);
  },
  delete: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.DELETE, callback);
  },
  getBlob: function(header, url, body, callback) {
    firstRequest(header, url, body, CallType.GET_BLOB, callback);
  }
});
