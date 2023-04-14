// config-overrides.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const resolvePath = p => path.resolve(__dirname, p);

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@root': resolvePath('src/'),
      '@app': resolvePath('src/app/'),
      '@component': resolvePath('src/app/core/component/'),
      '@entities': resolvePath('src/entities/'),
      '@features': resolvePath('src/features/'),
      '@pages': resolvePath('src/pages/'),
      '@shared': resolvePath('src/shared/'),
      '@store': resolvePath('src/store/')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.d.ts']
  };
  return config;
};
