const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ignorar react-native-maps en web
  if (env.mode === 'development' || env.platform === 'web') {
    config.resolve.alias['react-native-maps'] = false;
  }

  return config;
};
