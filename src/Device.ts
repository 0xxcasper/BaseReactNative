import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';

const systemVersion = DeviceInfo.getSystemVersion();
let osVersion: number | undefined;
try {
    if (systemVersion) {
        const tokens = _.split(systemVersion, '.');
        if (tokens && tokens.length > 0) {
            osVersion = parseInt(tokens[0]);
        }
    }

} catch (e) {

}
const Device = Object.freeze({
    osVersion: osVersion || 0
});
export default Device;