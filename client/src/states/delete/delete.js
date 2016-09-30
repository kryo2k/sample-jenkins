angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.delete', {
    url: '/delete/:id',
    templateUrl: 'src/states/delete/delete.html',
    controller: 'DeleteCtrl as $thingCtrl',
    resolve: {
      currentThing: ['$stateParams','Thing', function ($stateParams, Thing) {
        return Thing.get($stateParams).$promise
          .catch(function (err) { return false; });
      }]
    }
  });
})
.controller('DeleteCtrl', function ($scope, $state, currentThing) {
  $scope.thing = currentThing;

  $scope.confirm = function () {
    return currentThing.$remove().then(function (result) {
      $state.go('app.default');
      return result;
    });
  };
});
