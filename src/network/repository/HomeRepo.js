import ServerPath from "network/net/ServerPath";
import NetworkUtils from "network/net/NetworkUtils";

export default Object.freeze({
  getHomeBanner: function (callback) {
    NetworkUtils.get(null, ServerPath.homebanner, null, callback);
  },
  getNews: function (slug, callback) {
    NetworkUtils.get(null, `${ServerPath.news}${slug}`, null, callback);
  },
  getYTBLink: function (callback) {
    NetworkUtils.get(null, ServerPath.ytb_link, null, callback);
  },
  getDirectionMap: function (params, callback) {
    console.log('getDirectionMap', `${ServerPath.google_api_derection}${params}`);
    NetworkUtils.get(null, `${ServerPath.google_api_derection}${params}`, null, callback);
  },
});
