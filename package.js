Package.describe({
  name: 'webysr:googleapis-pub',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  googleapis: "2.1.7",
  lodash: "4.6.1"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('webysr:googleapis-oauth2-client');

  api.addFiles(['server/publishGoogleAPI.js'], 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('googleapis-pub-drive');
  api.addFiles('test/googleapis-pub-drive-tests.js');
});
