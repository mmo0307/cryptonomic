// config-overrides.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const resolvePath = p => path.resolve(__dirname, p);

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@app': resolvePath('src/'),
      '@redux': resolvePath('src/redux/'),
      '@selectors': resolvePath('src/redux/selectors/'),
      '@reducers': resolvePath('src/redux/reducers/'),
      '@api': resolvePath('src/redux/api/'),
      '@features': resolvePath('src/features/'),
      '@interface': resolvePath('src/models/Interface/'),
      '@type': resolvePath('src/models/Type/'),
      '@component': resolvePath('src/component/'),
      '@assets': resolvePath('src/assets/'),
      '@hooks': resolvePath('src/hooks/'),
      '@globals': resolvePath('src/globals/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts']
  };
  return config;
};
