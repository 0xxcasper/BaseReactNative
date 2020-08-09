import ServerPath from "network/net/ServerPath";
import NetworkUtils from "network/net/NetworkUtils";

export default Object.freeze({
  getPriceAll: function (callback) {
    NetworkUtils.get(null, ServerPath.price_all, null, callback);
  }
});
