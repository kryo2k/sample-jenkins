const
assert     = require('assert'),
http_mocks = require('node-mocks-http'),
mw         = require('./thing.middleware'),
ctrl       = require('./thing.ctrl'),
model      = require('./thing.model'),
router     = require('./index');

function buildResponse() {
  return http_mocks.createResponse({
    eventEmitter: require('events').EventEmitter
  });
}

describe('Thing', function () {
  describe('Model', function () {
    it('should be nameable', function () {
      const
      name = 'Test',
      doc  = new model({ name: name });

      assert.equal(doc.name, name);
    });

    it('should get a default created date', function () {
      const doc  = new model();
      assert.equal(doc.created instanceof Date, true);
    });

    it('should only allow updating name', function () {
      const
      name1 = 'Initial',
      name2 = 'Updated',
      created1 = new Date(),
      created2 = new Date(created1 - 8.64e7),
      doc  = new model({ name: name1, created: created1});

      assert.equal(doc.name,    name1);
      assert.equal(doc.created, created1);

      doc.applyUpdates({ name: name2, created: created2 });

      assert.equal(doc.name,    name2);
      assert.equal(doc.created, created1);
    });

    // MORE..
  });

  describe('Controller', function () {

    it('should pass thru thing from detail request', function (done) {

      const
      doc = new model({ name: 'testing' }),
      res = buildResponse(),
      req = http_mocks.createRequest({
        thing: doc
      });

      res.on('end', function() {
        const
        data = JSON.parse( res._getData() );

        assert.equal(data._id, doc._id);
        done();
      });

      ctrl.detail(req, res, done);
    });

    // MORE..
  });

  describe('Router', function () {
    it('should block detail request with invalid thing id', function (done) {

      const
      res = buildResponse(),
      req = http_mocks.createRequest({
        method: 'GET',
        url: '/invalidId'
      });

      res.on('end', function() {
        done(new Error('Should not have finished successfully.'));
      });

      router.handle(req, res, function (err) {
        assert.equal(err instanceof TypeError, true);
        done();
      });
    });

    // MORE..
  });
});
