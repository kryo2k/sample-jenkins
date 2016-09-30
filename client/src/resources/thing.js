angular.module('sampleJenkinsApp')
.factory('Thing', function ($resource) {
  return $resource('/api/thing/:id/:controller', {
      id: '@_id'
    },
    {
      // custom params here
    });
});
