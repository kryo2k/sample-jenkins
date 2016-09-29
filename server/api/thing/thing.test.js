const
assert = require('assert'),
mw     = require('./thing.middleware'),
ctrl   = require('./thing.ctrl'),
model  = require('./thing.model'),
router = require('./index');

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
  });

  describe('Middleware', function () {
    // TODO: ...
  });

  describe('Controller', function () {
    // TODO: ...
  });

  describe('Router', function () {
    // TODO: ...
  });
});
