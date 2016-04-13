/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

var Yelp = require('yelp');
var secrets = require('./config/local.env');
var yelpConsumerKey = secrets.YELP_KEY;
var yelpConsumerSecret = secrets.YELP_SECRET;
var yelpToken = secrets.YELP_TOKEN;
var yelpTokenSecret = secrets.YELP_TOKEN_SECRET;

var yelp = new Yelp({
  consumer_key: yelpConsumerKey,
  consumer_secret: yelpConsumerSecret,
  token: yelpToken,
  token_secret: yelpTokenSecret,
});

export default function(app) {
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  app.get('/yelp', function(req, res){

    console.log(req);
    yelp.search({category_filter: 'nightlife', limit: 20, sort: 1, location: req.query.location}).
    then(function(data) {
      console.log('hihi');
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
