'use strict';
const makeConfig = require('./makeConfig');

module.exports = makeConfig({
  isProduction: false,
  isElectronBuild: !!process.env.BUILD_ELECTRON,
  xboEndpoint: 'http://localhost:3000'
});
