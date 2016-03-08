// Write your package code here!

const GoogleAPI = Npm.Require('googleapis');
const Drive = GoogleAPI.drive('v2');

const getChildrenList = Meteor.wrapAsync(Drive.children.list.bind(Drive.children));

Meteor.publish('drive.children.list', function (folderId) {

    const poll = () => {

        console.log('Poll for drive children list...');
        console.log('User Id: ', this.userId);

        var oAuth2Client = new OAuth2Client(this.userId);

        //TODO only retrieve required fields if possible
        var response = getCalendarList({
            auth: oAuth2Client.get()
        });

        // generate the calendars
        var calendars = [];
        response.items.forEach(function (item) {

            // don't show googles generic calendars like:
            // #contacts@group.v.calendar.google.com
            // de.austrian#holiday@group.v.calendar.google.com
            // de.new_zealand#holiday@group.v.calendar.google.com
            // e_2_de#weeknum@group.v.calendar.google.com
            if (item.id.indexOf('#') === -1) {

                calendars.push({
                    id: item.id,
                    summary: item.summary,
                    description: item.description,
                    backgroundColor: item.backgroundColor
                });
            }

        });

        // publish
        calendars.forEach((doc) => {

            if (publishedKeys[doc.id]) {

                this.changed(COLLECTION_NAME, doc.id, doc);
            } else {

                publishedKeys[doc.id] = true;
                if (publishedKeys[doc.id]) {
                    this.added(COLLECTION_NAME, doc.id, doc);
                }
            }
        });
    };
});
