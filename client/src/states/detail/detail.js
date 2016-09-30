angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.detail', {
    url: '/detail/:id',
    templateUrl: 'src/states/detail/detail.html',
    controller: 'DetailCtrl as $thingCtrl',
    resolve: {
      currentThing: ['$stateParams','Thing', function ($stateParams, Thing) {
        return Thing.get($stateParams).$promise
          .catch(function (err) { return false; });
      }]
    }
  });
})
.controller('DetailCtrl', function ($scope, $state, currentThing) {
  $scope.thing = currentThing;

  $scope.saveChanges = function () {
    return currentThing.$save().then(function (result) {
      $state.go('app.default');
      return result;
    });
  };
});
