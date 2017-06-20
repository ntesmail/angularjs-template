angular.module('app.perm', [
    'ngSanitize',
    'ui.router',
    'shark-angularjs.ui'
]);;
//service
require('./perm.service');
//controller
require('./role/role.controller');
require('./role/edit.controller')
require('./user/user.controller')
//directive
require('./perm.directive');
//router
require('./router');
module.exports = 'app.perm';