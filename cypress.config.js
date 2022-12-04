const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  watchForFileChanges: false,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://juice-shop-sanitarskyi.herokuapp.com',
    // baseUrl: 'https://juice-shop.herokuapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
