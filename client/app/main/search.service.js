'use strict'

angular.module('nightclubApp')
  .factory('searchFactory', ['$http',function($http){
    var savedLocation;
    var location = {};

    var noClubFound = false;
    var clubObject = {};
    var selectedClubs = [];
    var savedClubs = [];


    location.saveClubs = function(clubs){
      savedClubs = clubs;
    }

  

    location.getLocation = function(){
      return savedLocation;
    }

    location.getClubs = function(){

      return savedClubs;
    }

    return location;
  }]);
