Package.describe({
  name: 'webysr:googleapis-pub',
  version: '1.0.0',
  summary: 'Create publications for Google Resources with ease',
  git: 'https://github.com/webysr/meteor-googleapis-pub.git',
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
  api.use('webysr:googleapis-pub');
  api.addFiles('test/googleapis-pub-drive-tests.js');
});
