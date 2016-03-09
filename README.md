# Google API Publications for Meteor

`meteor add webysr:googleapis-pub`

### Example Usage

#### On the server:

```javascript
Meteor.publishGoogleAPI('drive.files.list');

```

#### On the client:
```javascript
let sub = Meteor.subscribe('drive.files.list', {
            orderBy: 'title',
            maxResults: 10,
            q: `'root' in parents`,
            fields: "items(id,defaultOpenWithLink,thumbnailLink,title)"
        });
```