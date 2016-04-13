'use strict';

angular.module('nightclubApp.auth', [
  'nightclubApp.constants',
  'nightclubApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
