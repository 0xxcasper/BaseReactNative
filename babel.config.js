module.exports = {
  presets: ['module:metro-react-native-babel-preset', "@babel/preset-typescript"],
  "plugins": [
      ["module-resolver", {
          "cwd": "babelrc",
          "root": ["./src"],
          "alias": {
            "routes": "./src/routes",
            "navigation": "./src/navigation",
            "components": "./src/components",
            "common": "./src/commons",
          }
      }], 
      ["@babel/preset-typescript", {
          "allExtensions": true
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
