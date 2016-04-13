'use strict'

angular.module('nightclubApp')
  .controller('SearchController', ['$scope', 'searchFactory', function($scope, searchFactory){
    $scope.location;
    $scope.search = function(){
      searchFactory.saveLocation($scope.location);
    };
    $scope.output = searchFactory.getLocation();
    console.log($scope.output);
  }]);
