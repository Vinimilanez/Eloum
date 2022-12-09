// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset', 
//     "@babel/preset-flow"],
//   env: {
//     production: {
//       plugins: [
//         'react-native-paper/babel',
//         'babel-plugin-transform-typescript-metadata',
//         ["@babel/plugin-proposal-decorators", { "legacy": true }],
//         '@babel/plugin-syntax-decorators'
//       ],
//     },
//   }
// };


module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', 
    "@babel/preset-flow"
  ],
  plugins: [
    'react-native-paper/babel',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
};