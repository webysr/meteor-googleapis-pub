import {OAuth2Client} from 'meteor/webysr:googleapis-oauth2-client';

const _ = Npm.require('lodash');
const GoogleAPI = Npm.require('googleapis');

const getAPIByName = (apiName) => {

  switch(apiName.toLowerCase()) {
    case 'drive': return GoogleAPI.drive('v2');
    default: break;
  }
};

Meteor.publishGoogleAPI = function(apiMethodIdentifier) {

  const split = apiMethodIdentifier.split('.');
  const apiName = split[0];
  const resource = split[1];
  const method = split[2];
  const collectionName = `${apiName}.${resource}`;
  const API = getAPIByName(apiName);
  const callAPIMethod = Meteor.wrapAsync(_.get(API, `${resource}.${method}`).bind(_.get(API, resource)));

  Meteor.publish(apiMethodIdentifier, function (params) {

    const oAuth2Client = new OAuth2Client(this.userId);
    const publishedKeys = {};

    const poll = () => {

      console.log(`Poll for ${apiMethodIdentifier}...`);

      // TODO check if auth was provided and do not override if so
      params.auth = oAuth2Client.get();
      let response = callAPIMethod(params);

      // generate the documents
      var documents = [];
      response.items.forEach(function (item) {

        documents.push(item);
      });

      // publish
      documents.forEach((doc) => {

        if (publishedKeys[doc.id]) {

          this.changed(collectionName, doc.id, doc);
        } else {

          publishedKeys[doc.id] = true;
          if (publishedKeys[doc.id]) {
            this.added(collectionName, doc.id, doc);
          }
        }
      });
    };

    poll();
    this.ready();

    this.onStop(() => {

      console.log(`${apiMethodIdentifier} publication stopped...`);
    });
  });
};