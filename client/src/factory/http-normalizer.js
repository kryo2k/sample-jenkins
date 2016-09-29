angular.module('sampleJenkinsApp')
.factory('HttpNormalizer', function ($q) {
  return {
    responseError: function (response) {
      if(!response) return $q.reject(response);

      var
      status  = response.status,
      data    = response.data||{};

      if(data.stack) { // show an alert with the stack information
        alert(data.stack);
      }

      return $q.reject(data);
    }
  };
});
