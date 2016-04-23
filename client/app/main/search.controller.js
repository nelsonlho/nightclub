'use strict'

angular.module('nightclubApp')
  .controller('SearchController', ['$scope', '$http', 'searchFactory', 'Auth', function($scope, $http, searchFactory, Auth){
    $scope.auth = Auth.isLoggedIn;
    $scope.location;
    $scope.clubs = searchFactory.getClubs();
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
}]);
