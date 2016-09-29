angular.module('sampleJenkinsApp')
.factory('Thing', function ($resource) {
  return $resource('/api/thing/:id/:controller', {
      id: '@_id'
    },
    {
      getDetail: {
        method: 'GET',
        params: {
        }
      },
      remove: {
        method: 'DELETE',
        params: {
        }
      },
      create: {
        method: 'POST',
        params: {
        }
      },
      update: {
        method: 'PUT',
        params: {
        }
      }
    });
})
.service('$thing', function (Thing) {
  return {
    query: function (query) {
      return Thing.query(query).$promise;
    },
    create: function (spec) {
      return Thing.create(spec).$promise;
    },
    getDetail: function (id) {
      return Thing.getDetail({ id: id }).$promise;
    },
    remove: function (id) {
      return Thing.remove({ id: id }).$promise;
    },
    update: function (id, spec) {
      return Thing.update({ id: id }, spec).$promise;
    }
  };
});
