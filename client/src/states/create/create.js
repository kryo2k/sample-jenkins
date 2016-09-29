angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.create', {
    url: '/create',
    templateUrl: 'src/states/create/create.html',
    controller: 'CreateCtrl as $thingCtrl'
  });
})
.controller('CreateCtrl', function ($scope, $state, $thing) {
  $scope.submit = function () {
    return $thing.create($scope.model)
      .then(function (result) {
        $state.go('app.default');
        return result;
      });
  };
});
