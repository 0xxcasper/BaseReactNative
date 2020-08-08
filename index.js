/**
 * @format
 */

if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
}

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

import App from "./src/App"

console.disableYellowBox = true;

AppRegistry.registerComponent('carbro', () => App);
