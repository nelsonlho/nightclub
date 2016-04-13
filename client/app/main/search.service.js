'use strict'

angular.module('nightclubApp')
  .factory('searchFactory', ['$http', function($http){
    var savedLocation;
    var location = {};
    location.saveLocation = function(location){
      if (location !== null || location !== ''){
        savedLocation = location;
        var config = {
              params: {
                    location: savedLocation
              }
          }

        $http.get('/yelp', config)
        .success(function(res){  console.log(res);})
        .error(function(err){ });
    }

    }

    location.getLocation = function(){
      return savedLocation;
    }


    return location;
  }]);
