angular.module('sampleJenkinsApp')
.config(function ($stateProvider) {
  $stateProvider.state('app.default', {
    url: '/',
    templateUrl: 'src/states/default/default.html',
    controller: 'DefaultCtrl as $defaultCtrl'
  });
})
.controller('DefaultCtrl', function ($scope, $thing) {

  var
  loading = false,
  ctrl    = this;

  //
  // Controller stuff
  //

  this.markLoading = function () {
    loading = true;
    return this;
  };

  this.markFinished = function () {
    loading = false;
    return this;
  };

  //
  // Scope stuff
  //

  Object.defineProperties($scope, {
    isLoading: { get: function () { return loading; } }
  });

  $scope.reload = function () {
    ctrl.markLoading();

    return $thing.query()
    // return $thing.query({ _id: 'x' }) // throws CastError
      .then(function (things) {
        $scope.things = things;
        ctrl.markFinished();
        return things;
      });
  };
});
