const
mongoose  = require('mongoose'),
mongoUtil = require('../server/lib/mongo-util'),
ObjectId  = mongoose.Types.ObjectId;

const
TEST_ID_1 = '000000000000000000000001',
TEST_ID_2 = '000000000000000000000002',
TestSchema = new mongoose.Schema({
  name: String
}),
TestModel = mongoose.model('TestModel', TestSchema);

//
// test mongoUtil.isObjectId
//

exports['isObjectId null'] = (test) => {
  test.equals(mongoUtil.isObjectId(null), false);
  test.done();
};
exports['isObjectId undefined'] = (test) => {
  test.equals(mongoUtil.isObjectId(undefined), false);
  test.done();
};
exports['isObjectId boolean [false]'] = (test) => {
  test.equals(mongoUtil.isObjectId(false), false);
  test.done();
};
exports['isObjectId boolean [true]'] = (test) => {
  test.equals(mongoUtil.isObjectId(true), false);
  test.done();
};
exports['isObjectId string [empty]'] = (test) => {
  test.equals(mongoUtil.isObjectId(''), false);
  test.done();
};
exports['isObjectId string [garbage]'] = (test) => {
  test.equals(mongoUtil.isObjectId('garbage'), false);
  test.done();
};
exports['isObjectId string [something invalid]'] = (test) => {
  test.equals(mongoUtil.isObjectId('something invalid'), false);
  test.done();
};
exports['isObjectId string [xxxxxxxxxxxxxxxxxxxxxxxx]'] = (test) => {
  test.equals(mongoUtil.isObjectId('xxxxxxxxxxxxxxxxxxxxxxxx'), false);
  test.done();
};
exports['isObjectId string [valid string id]'] = (test) => {
  test.equals(mongoUtil.isObjectId(TEST_ID_1), true);
  test.done();
};
exports['isObjectId number [123456]'] = (test) => {
  test.equals(mongoUtil.isObjectId(123456), false);
  test.done();
};
exports['isObjectId object [plain object]'] = (test) => {
  test.equals(mongoUtil.isObjectId({}), false);
  test.done();
};
exports['isObjectId object [date]'] = (test) => {
  test.equals(mongoUtil.isObjectId(new Date()), false);
  test.done();
};
exports['isObjectId object [ObjectId new]'] = (test) => {
  test.equals(mongoUtil.isObjectId(new ObjectId()), true);
  test.done();
};
exports['isObjectId object [ObjectId from string]'] = (test) => {
  test.equals(mongoUtil.isObjectId(new ObjectId(TEST_ID_1)), true);
  test.done();
};

//
// test mongoUtil.getObjectId
//

exports['getObjectId from string'] = (test) => {
  test.equals(mongoUtil.getObjectId(TEST_ID_1) instanceof ObjectId, true);
  test.done();
};
exports['getObjectId from object _id [string]'] = (test) => {
  test.equals(mongoUtil.getObjectId({ _id: TEST_ID_1 }) instanceof ObjectId, true);
  test.done();
};
exports['getObjectId from object _id [ObjectId]'] = (test) => {
  test.equals(mongoUtil.getObjectId({ _id: new ObjectId(TEST_ID_1) }) instanceof ObjectId, true);
  test.done();
};
exports['getObjectId from object id [string]'] = (test) => {
  test.equals(mongoUtil.getObjectId({ id: TEST_ID_1 }) instanceof ObjectId, true);
  test.done();
};
exports['getObjectId from object id [ObjectId]'] = (test) => {
  test.equals(mongoUtil.getObjectId({ id: new ObjectId(TEST_ID_1) }) instanceof ObjectId, true);
  test.done();
};
exports['getObjectId null'] = (test) => {
  test.equals(mongoUtil.getObjectId(null), false);
  test.done();
};
exports['getObjectId undefined'] = (test) => {
  test.equals(mongoUtil.getObjectId(undefined), false);
  test.done();
};
exports['getObjectId boolean [false]'] = (test) => {
  test.equals(mongoUtil.getObjectId(false), false);
  test.done();
};
exports['getObjectId boolean [true]'] = (test) => {
  test.equals(mongoUtil.getObjectId(true), false);
  test.done();
};
exports['getObjectId string [empty]'] = (test) => {
  test.equals(mongoUtil.getObjectId(''), false);
  test.done();
};
exports['getObjectId string [garbage]'] = (test) => {
  test.equals(mongoUtil.getObjectId('garbage'), false);
  test.done();
};
exports['getObjectId string [something invalid]'] = (test) => {
  test.equals(mongoUtil.getObjectId('something invalid'), false);
  test.done();
};

//
// test mongoUtil.arrayOfObjectId
//

exports['arrayOfObjectId single id'] = (test) => {
  const arr = mongoUtil.arrayOfObjectId(TEST_ID_1);
  test.equals(Array.isArray(arr), true);
  test.equals(arr.length, 1);
  test.equals(arr[0].equals(TEST_ID_1), true);
  test.done();
};
exports['arrayOfObjectId multiple ids'] = (test) => {
  const arr = mongoUtil.arrayOfObjectId([TEST_ID_1, TEST_ID_2]);
  test.equals(Array.isArray(arr), true);
  test.equals(arr.length, 2);
  test.equals(arr[0].equals(TEST_ID_1), true);
  test.equals(arr[1].equals(TEST_ID_2), true);
  test.done();
};
exports['arrayOfObjectId multiple ids (with invalid)'] = (test) => {
  const arr = mongoUtil.arrayOfObjectId([TEST_ID_1, TEST_ID_2, 'X']);
  test.equals(Array.isArray(arr), true);
  test.equals(arr.length, 2);
  test.equals(arr[0].equals(TEST_ID_1), true);
  test.equals(arr[1].equals(TEST_ID_2), true);
  test.done();
};
exports['arrayOfObjectId null'] = (test) => {
  test.equals(mongoUtil.arrayOfObjectId(null), false);
  test.done();
};
exports['arrayOfObjectId undefined'] = (test) => {
  test.equals(mongoUtil.arrayOfObjectId(undefined), false);
  test.done();
};
exports['arrayOfObjectId boolean [false]'] = (test) => {
  test.equals(mongoUtil.arrayOfObjectId(false), false);
  test.done();
};
exports['arrayOfObjectId boolean [true]'] = (test) => {
  test.equals(mongoUtil.arrayOfObjectId(true), false);
  test.done();
};

//
// test mongoUtil.isIdEqual
//

exports['isIdEqual A vs A'] = (test) => {
  test.equals(mongoUtil.isIdEqual(TEST_ID_1, TEST_ID_1), true);
  test.done();
};
exports['isIdEqual A vs ObjectId(A)'] = (test) => {
  test.equals(mongoUtil.isIdEqual(TEST_ID_1, new ObjectId(TEST_ID_1)), true);
  test.done();
};
exports['isIdEqual A vs B'] = (test) => {
  test.equals(mongoUtil.isIdEqual(TEST_ID_1, TEST_ID_2), false);
  test.done();
};
exports['isIdEqual null vs null'] = (test) => {
  test.equals(mongoUtil.isIdEqual(null, null), false);
  test.done();
};
exports['isIdEqual null vs undefined'] = (test) => {
  test.equals(mongoUtil.isIdEqual(null, undefined), false);
  test.done();
};

//
// test mongoUtil.isDocument
//

exports['isDocument mongoose document object'] = (test) => {
  test.equals(mongoUtil.isDocument(new TestModel({ name: 'test' })), true);
  test.done();
};
exports['isDocument plain object'] = (test) => {
  test.equals(mongoUtil.isDocument({}), false);
  test.done();
};
exports['isDocument string'] = (test) => {
  test.equals(mongoUtil.isDocument('xxx'), false);
  test.done();
};
exports['isDocument number'] = (test) => {
  test.equals(mongoUtil.isDocument(123456), false);
  test.done();
};
exports['isDocument null'] = (test) => {
  test.equals(mongoUtil.isDocument(null), false);
  test.done();
};
exports['isDocument undefined'] = (test) => {
  test.equals(mongoUtil.isDocument(undefined), false);
  test.done();
};

//
// test mongoUtil.indexOfObjectId
//

exports['indexOfObjectId array index -1'] = (test) => {
  test.equals(mongoUtil.indexOfObjectId([TEST_ID_1, TEST_ID_2], null), -1);
  test.done();
};
exports['indexOfObjectId array index 0'] = (test) => {
  test.equals(mongoUtil.indexOfObjectId([TEST_ID_1, TEST_ID_2], TEST_ID_1), 0);
  test.done();
};
exports['indexOfObjectId array index 1'] = (test) => {
  test.equals(mongoUtil.indexOfObjectId([TEST_ID_1, TEST_ID_2], TEST_ID_2), 1);
  test.done();
};
exports['indexOfObjectId undefined array'] = (test) => {
  test.equals(mongoUtil.indexOfObjectId(undefined), -1);
  test.done();
};
exports['indexOfObjectId null array'] = (test) => {
  test.equals(mongoUtil.indexOfObjectId(null), -1);
  test.done();
};

//
// test mongoUtil.inAllowed
//

exports['inAllowed single request id multiple allowed ids'] = (test) => {
  const
  criterion  = mongoUtil.inAllowed(TEST_ID_1, [TEST_ID_1, TEST_ID_2], {
    otherCondition: true
  });

  test.equals(Array.isArray(criterion['$in']), true);
  test.equals(criterion['$in'].length, 1);
  test.equals(criterion.otherCondition, true);
  test.done();
};
exports['inAllowed multiple request ids multiple allowed ids'] = (test) => {
  const
  criterion  = mongoUtil.inAllowed([TEST_ID_1, TEST_ID_2], [TEST_ID_1, TEST_ID_2]);

  test.equals(Array.isArray(criterion['$in']), true);
  test.equals(criterion['$in'].length, 2);
  test.done();
};
exports['inAllowed multiple request ids single allowed id'] = (test) => {
  const
  criterion  = mongoUtil.inAllowed([TEST_ID_1, TEST_ID_2], TEST_ID_1);

  test.equals(Array.isArray(criterion['$in']), true);
  test.equals(criterion['$in'].length, 1);
  test.done();
};

//
// test mongoUtil.sortDefinition
//

exports['sortDefinition string [+fieldAsc]'] = (test) => {
  const def = mongoUtil.sortDefinition('+fieldAsc');
  test.equals(def.fieldAsc,  1);
  test.done();
};
exports['sortDefinition string [-fieldDsc]'] = (test) => {
  const def = mongoUtil.sortDefinition('-fieldDsc');
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition string [+fieldAsc -fieldDsc]'] = (test) => {
  const def = mongoUtil.sortDefinition('+fieldAsc -fieldDsc');
  test.equals(def.fieldAsc,  1);
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition string [fieldAsc:+]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldAsc:+');
  test.equals(def.fieldAsc,  1);
  test.done();
};
exports['sortDefinition string [fieldDsc:-]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldDsc:-');
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition string [fieldAsc:+ fieldDsc:-]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldAsc:+ fieldDsc:-');
  test.equals(def.fieldAsc,  1);
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition string [fieldAsc:asc]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldAsc:asc');
  test.equals(def.fieldAsc,  1);
  test.done();
};
exports['sortDefinition string [fieldDsc:dsc]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldDsc:dsc');
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition string [fieldAsc:asc fieldDsc:dsc]'] = (test) => {
  const def = mongoUtil.sortDefinition('fieldAsc:asc fieldDsc:dsc');
  test.equals(def.fieldAsc,  1);
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition object [+fieldAsc]'] = (test) => {
  const def = mongoUtil.sortDefinition({ fieldAsc: '+' });
  test.equals(def.fieldAsc,  1);
  test.done();
};
exports['sortDefinition object [-fieldDsc]'] = (test) => {
  const def = mongoUtil.sortDefinition({ fieldDsc: '-' });
  test.equals(def.fieldDsc, -1);
  test.done();
};
exports['sortDefinition object [+fieldAsc -fieldDsc]'] = (test) => {
  const def = mongoUtil.sortDefinition({ fieldAsc: '+', fieldDsc: '-' });
  test.equals(def.fieldAsc,  1);
  test.equals(def.fieldDsc, -1);
  test.done();
};

//
// test mongoUtil.fieldSelect
//

exports['fieldSelect without includes'] = (test) => {
  test.equals(mongoUtil.fieldSelect('a b c').join(' '), 'a b c');
  test.done();
};
exports['fieldSelect with includes'] = (test) => {
  test.equals(mongoUtil.fieldSelect('a b c c c c', 'b c x y y y y').join(' '), 'b c x y a');
  test.done();
};
exports['fieldSelect with arrays'] = (test) => {
  test.equals(mongoUtil.fieldSelect(['a','b','c'], ['b','c','x','y']).join(' '), 'b c x y a');
  test.done();
};
exports['fieldSelect with array and invalids'] = (test) => {
  test.equals(mongoUtil.fieldSelect(['a', null], ['b', true]).join(' '), 'b a');
  test.done();
};
exports['fieldSelect negating includes'] = (test) => {
  test.equals(mongoUtil.fieldSelect('-b -c', 'a b c').join(' '), 'a');
  test.done();
};
exports['fieldSelect negating includes not found'] = (test) => {
  test.equals(mongoUtil.fieldSelect('-b -c -d', 'a b c').join(' '), 'a');
  test.done();
};

//
// test mongoUtil.schemaFields
//

exports['schemaFields all test'] = (test) => {
  test.equals(mongoUtil.schemaFields(TestSchema).join(' '), 'name _id __v');
  test.done();
};
exports['schemaFields whitelist'] = (test) => {
  test.equals(mongoUtil.schemaFields(TestSchema, 'name').join(' '), 'name');
  test.done();
};
exports['schemaFields whitelist invalid [with name]'] = (test) => {
  test.equals(mongoUtil.schemaFields(TestSchema, 'date name').join(' '), 'name');
  test.done();
};
exports['schemaFields whitelist invalid [without name]'] = (test) => {
  test.equals(mongoUtil.schemaFields(TestSchema, 'date').join(' '), '');
  test.done();
};
exports['schemaFields blacklist'] = (test) => {
  test.equals(mongoUtil.schemaFields(TestSchema, '-__v').join(' '), 'name _id');
  test.done();
};
exports['schemaFields graylist throw error'] = (test) => {
  test.throws(() => mongoUtil.schemaFields(TestSchema, 'name -_id -__v'), Error);
  test.done();
};

//
// test mongoUtil.hasAllSelected
// -- WARNING: isSelected(...) on new documents always returns true, even
// -- if the field does not exist in the schema.

exports['hasAllSelected string list'] = (test) => {
  const doc = new TestModel({ name: 'test' });
  test.equals(mongoUtil.hasAllSelected(doc, 'name'), true);
  test.equals(mongoUtil.hasAllSelected(doc, '_id'),  true);
  test.equals(mongoUtil.hasAllSelected(doc, '__v'),  true);
  test.equals(mongoUtil.hasAllSelected(doc, 'name _id __v'),  true);
  test.done();
};

exports['hasAllSelected array list'] = (test) => {
  const doc = new TestModel({ name: 'test' });
  test.equals(mongoUtil.hasAllSelected(doc, ['name']), true);
  test.equals(mongoUtil.hasAllSelected(doc, ['_id']),  true);
  test.equals(mongoUtil.hasAllSelected(doc, ['__v']),  true);
  test.equals(mongoUtil.hasAllSelected(doc, ['name','_id','__v']),  true);
  test.done();
};

//
// test mongoUtil.hasAnySelected
// -- WARNING: isSelected(...) on new documents always returns true, even
// -- if the field does not exist in the schema.

exports['hasAnySelected string list'] = (test) => {
  const doc = new TestModel({ name: 'test' });
  test.equals(mongoUtil.hasAnySelected(doc, 'name'), true);
  test.equals(mongoUtil.hasAnySelected(doc, '_id'),  true);
  test.equals(mongoUtil.hasAnySelected(doc, '__v'),  true);
  test.equals(mongoUtil.hasAnySelected(doc, 'name _id __v'),  true);
  test.done();
};

exports['hasAnySelected array list'] = (test) => {
  const doc = new TestModel({ name: 'test' });
  test.equals(mongoUtil.hasAnySelected(doc, ['name']), true);
  test.equals(mongoUtil.hasAnySelected(doc, ['_id']),  true);
  test.equals(mongoUtil.hasAnySelected(doc, ['__v']),  true);
  test.equals(mongoUtil.hasAnySelected(doc, ['name','_id','__v']),  true);
  test.done();
};
