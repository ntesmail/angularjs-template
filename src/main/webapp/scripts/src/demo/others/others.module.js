angular.module('app.demo.others', []);
//controller
require('./modal/modal.controller');
require('./modal/dialog.controller');
require('./todos/todos.controller');
//service
require('./todos/todos.service');
//router
require('./router');
module.exports = 'app.demo.others';