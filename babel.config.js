module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
      ["module-resolver", {
          "cwd": "babelrc",
          "root": ["./src"],
          "alias": {
            "routes": "./src/routes",
            "navigation": "./src/navigation"
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
