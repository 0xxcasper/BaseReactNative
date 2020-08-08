module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    "plugins": [
        ["module-resolver", {
            "cwd": "babelrc",
            root: ["./src"],
            extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
            alias: {
                "actionTypes": "./src/actionTypes",
                "actions": "./src/actions",
                "assets": "./src/assets",
                "common": "./src/common",
                "network": "./src/network",
                "reducers": "./src/reducers",
                "views": "./src/views",
                "widgets": "./src/widgets",
                "modules": "./src/views/modules",
                "hooks": "./src/hooks",
                "i18n": "./src/i18n",
                "contexts": "./src/contexts",
                "routes": "./src/routes",
                "saga": "./src/saga",
                "selectors": "./src/selectors",
                "types": "./src/types",
                "helpers": "./src/helpers",
            }
        }]
    ],
    "env": {
        "production": {
            "plugins": [
                "transform-remove-console"
            ]
        }
    }
};
