angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.detail', {
    url: '/detail/:id',
    templateUrl: 'src/states/detail/detail.html',
    controller: 'DetailCtrl as $thingCtrl',
    resolve: {
      currentThing: ['$stateParams','$thing', function ($stateParams, $thing) {
        return $thing.getDetail($stateParams.id).catch(function (err) {
          return false;
        });
      }]
    }
  });
})
.controller('DetailCtrl', function ($scope, $state, $thing, currentThing) {
  $scope.thing = currentThing;

  $scope.saveChanges = function () {
    return $thing.update(currentThing._id, $scope.thing)
      .then(function () {
        $state.go('app.default');
      });
  };
});
