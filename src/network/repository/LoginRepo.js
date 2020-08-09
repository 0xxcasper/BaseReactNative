import ServerPath from "network/net/ServerPath";
import NetworkUtils from "network/net/NetworkUtils";

export default Object.freeze({
  login: function (body, callback) {
    NetworkUtils.post(null, ServerPath.login, body, callback);
  }
});
