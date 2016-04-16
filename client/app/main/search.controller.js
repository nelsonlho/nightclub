'use strict'

angular.module('nightclubApp')
  .controller('SearchController', ['$scope', '$http', 'searchFactory', function($scope, $http, searchFactory){

    $scope.location;
    $scope.clubs = searchFactory.getClubs();
    console.log($scope.clubs);
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
      //$scope.clubs = searchFactory.searchClubs($scope.location);

      //$timeout( function(){ $scope.clubs = searchFactory.getClubs() }, 10000);
    }




  }]);
