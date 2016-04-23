/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var Yelp = require('yelp');


var yelp = new Yelp({
  consumer_key: process.env.YELP_KEY,
  consumer_secret: process.env.YELP_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET,
});

export default function(app) {
  // Insert routes below
  app.use('/api/clubs', require('./api/club'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth').default);

  app.get('/yelp', function(req, res){

    var location = req.query.location;

    yelp.search({category_filter: 'nightlife', sort: 1, location: location}).
    then(function(data) {
      res.json(data.businesses);
    }).catch(function(err){
      console.log(err);
    })
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
