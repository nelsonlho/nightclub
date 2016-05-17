'use strict'

angular.module('nightclubApp')
  .controller('SearchController', ['$scope', '$http', 'searchFactory', 'Auth', function($scope, $http, searchFactory, Auth){
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.user = Auth.getCurrentUser();
    $scope.location;
    $scope.clubs = searchFactory.getClubs();

    $scope.showJoinButton = function(club){
        if(!$scope.isLoggedIn){
          return false;
        }

        if(!club.usersJoining){
          return true;
        }

        if(club.usersJoining.indexOf($scope.user._id) === -1){//user joined already.
          return true;
        }

        return false;
    }

    $scope.showUnjoinButton = function(club){
      if(!$scope.isLoggedIn || !club.usersJoining){
        return false;
      }

      if(club.usersJoining.indexOf($scope.user._id) !== -1){//user joined already.
        return true;
      }
      /*if(club.usersJoining && $scope.isLoggedIn)
        return true;
      else
        return false;*/
    }

    $scope.search = function(){
      var queryLocation = $scope.location;
      var config = {
        params: {
          location: queryLocation
        }
      }
      $http.get('/yelp', config).success(function(res){
        $scope.clubs = res;
        searchFactory.saveClubs($scope.clubs);
      });
    }

    $scope.joinClub = searchFactory.joinClub;
    $scope.unjoinClub = searchFactory.unjoinClub;
}]);
