import React from 'react';
import {Platform,} from "react-native";
import DeviceInfo from 'react-native-device-info';

export default Object.freeze({
  isBunnyEarDevice: function () {
    let modelStr = DeviceInfo.getModel();
    if (Platform.OS === 'ios') {
      return modelStr && (modelStr.includes('X') || modelStr.includes('Max') || modelStr.includes('Pro') || modelStr.includes('11'))
    }
    return false
  }
})
