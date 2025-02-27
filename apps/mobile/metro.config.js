const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    extraNodeModules: {
      // Ensure Metro resolves modules from the monorepo root
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      '@babel/runtime': path.resolve(
        __dirname,
        '../../node_modules/@babel/runtime',
      ),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules'),
    ],
  },
  watchFolders: [
    path.resolve(__dirname, '../../packages'), // Ensure Metro watches shared package
    path.resolve(__dirname, '../../node_modules'), // Watch monorepo root node_modules
  ],
};

module.exports = mergeConfig(defaultConfig, customConfig);
