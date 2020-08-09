import ServerPath from "network/net/ServerPath";
import NetworkUtils from "network/net/NetworkUtils";

export default Object.freeze({
  getAllCarBrands: function (callback) {
    NetworkUtils.get(null, ServerPath.all_car_brands, null, callback);
  },
});
