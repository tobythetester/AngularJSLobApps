exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'example.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:63342/AngularJsLineOfBusinessApplications/index.html#/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
