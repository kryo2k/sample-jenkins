const
myModule = require('../lib/my-module');

exports['ensure library is included'] = (test) => {
  test.equals(myModule.myFunction(), true);
  test.done();
};
