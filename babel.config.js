module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
      ["module-resolver", {
          "cwd": "babelrc",
          "root": ["./src"],
          "alias": {
            "routes": "./src/routes",
            "navigation": "./src/navigation",
            "routeNames": "./src/navigation/routeNames",
            "components": "./src/components"
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
