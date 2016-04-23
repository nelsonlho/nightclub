/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import _ from 'lodash';
import Club from './api/club/club.model';

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

  app.get('/yelp', function(req, res){ //todo move this to the folder /api/club/  on the route /api/clubs with GET method.

    var location = req.query.location;

    yelp.search({category_filter: 'nightlife', sort: 1, location: location}).
    then(function(yelpClubs) {

      var yelpClubs = yelpClubs.businesses;
      var ids = _.map(yelpClubs,function(yelpClub){
        return yelpClub.id;
      })

      Club.find({ id : { $in : ids}},function(err,clubsFound){
        _.each(yelpClubs,function(yelpClub){
          var clubFound = _.find(clubsFound,{id : yelpClub.id});
          if(clubFound){
            _.merge(yelpClub,clubFound); //add the data from database
          }

        });
        // stitch the data together todo use lodash.
        res.json(yelpClubs);
      })

      //todo merge in the data from our clubs model. joinedCount, joinedUsers
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
