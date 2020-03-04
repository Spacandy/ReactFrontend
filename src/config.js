/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error('Do not import `config.js` from inside the client-side code.');
}

module.exports = {
  // this is 8081 for aws elb
  port: 8081,

  app: {
    clientUrl: '',
    localUrl: `http://localhost:3000`,
    appUrl: process.env.APP_URL,
  },

  // API Gateway
  api: {
    apiUrl: process.env.API_BE_URL,
  },

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID,
  },

  // Checkout
  forte: {
    username: process.env.FORTE_USERNAME,
    password: process.env.FORTE_PASSWORD,
    orgId: process.env.FORTE_ORG,
    locId: process.env.FORTE_LOC,
  },
};
