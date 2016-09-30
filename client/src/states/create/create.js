angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.create', {
    url: '/create',
    templateUrl: 'src/states/create/create.html',
    controller: 'CreateCtrl as $thingCtrl'
  });
})
.controller('CreateCtrl', function ($scope, $state, Thing) {
  $scope.model = new Thing();

  $scope.submit = function () {
    return $scope.model.$save().then(function (result) {
      $state.go('app.default');
      return result;
    });
  };
});
