'use strict';

angular.module('ordioApp', ['ngRoute', 'ngAnimate', 'ngSanitize'])
  .config(function ($routeProvider, $httpProvider) {

    // cross-domain ajax requests
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
