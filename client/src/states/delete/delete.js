angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.delete', {
    url: '/delete/:id',
    templateUrl: 'src/states/delete/delete.html',
    controller: 'DeleteCtrl as $thingCtrl',
    resolve: {
      currentThing: ['$stateParams','$thing', function ($stateParams, $thing) {
        return $thing.getDetail($stateParams.id).catch(function (err) {
          return false;
        });
      }]
    }
  });
})
.controller('DeleteCtrl', function ($scope, $state, $thing, currentThing) {
  $scope.thing = currentThing;

  $scope.confirm = function () {
    return $thing.remove(currentThing._id).then(function (result) {
      $state.go('app.default');
      return result;
    });
  };
});
