'use strict'

angular.module('nightclubApp')
  .factory('searchFactory', ['$http','Auth',function($http){
    var savedLocation;
    var location = {};

    var noClubFound = false;
    var clubObject = {};
    var selectedClubs = [];
    var savedClubs = [];

    location.joinClub = function(club){
        var isInOurDb = club._id;
        if(isInOurDb){
          $http.put("/api/clubs/" + club._id + "/join").then(function(res){
            return _.merge(club,res.data);
          });
        }else{
          $http.post("/api/clubs",club).success(function(newClub){ //step1 create.
              $http.put("/api/clubs/" + newClub._id + "/join").success(function(res){
                console.log(res);
                return _.merge(club,res.data);
              }); //step2 join that club.
          });
        }
    }

    location.unjoinClub = function(club){
      //todo check that club has an _id!
      $http.delete("/api/clubs/" + club._id + "/join").then(function(res){
        return angular.copy(res.data.usersJoining,club.usersJoining); //todo try club.usersJoining = res.data.usersJoining
      }); //todo edit the club object after that request (see joinClub.)
    }

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
