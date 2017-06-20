angular.module('app.global', [
    'ngSanitize',
    'ui.router',
    'shark-angularjs.ui'
]);
//controller
require('./home/home.controller');
require('./header/header.controller');
require('./unauthorized/unauthorized.controller');
//router
require('./router');
module.exports = 'app.global';