module.exports = {
  // Target must be serverless
  target: 'serverless',

  webpack: function (config) {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';
    return config;
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
};
