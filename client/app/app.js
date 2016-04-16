'use strict';

angular.module('nightclubApp', [
  'nightclubApp.auth',
  'nightclubApp.admin',
  'nightclubApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularUtils.directives.dirPagination'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
