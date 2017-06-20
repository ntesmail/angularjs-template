angular.module('app.demo.list', []);
//service
require('./list.service');
//controller
require('./list1/list1.controller');
require('./list1/detail/detail.controller');
require('./list2/list2.controller');
require('./list2/child/child.controller');
//filter
require('./sex.filter');
//router
require('./router');
module.exports = 'app.demo.list';