angular.module('sampleJenkinsApp', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  // abstract state for all others to iniherit
  $stateProvider.state('app', {
    'abstract': true ,
    templateUrl: 'src/app.html'
  });

  // un-handled states go to /
  $urlRouterProvider.otherwise('/');

  // provide html5 location updating
  $locationProvider.html5Mode(true);

  // add some http middleware
  $httpProvider.interceptors.push('HttpNormalizer');
});
