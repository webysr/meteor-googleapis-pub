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

### Be wiser, Webweiser

Visit my company website for more Information about [Webweiser Software](https://www.webweiser.at). At the moment, there is only a german version available. But there will be an english version soon. I promise! :) 

### License

[MIT](../master/LICENSE)