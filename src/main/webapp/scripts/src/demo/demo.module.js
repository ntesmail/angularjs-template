var formModule = require('./form/form.module');
var listModule = require('./list/list.module');
var othersModule = require('./others/others.module');
var testModule = require('./test/test.module');
angular.module('app.demo', [
    'ngSanitize',
    'ui.router',
    'shark-angularjs.ui',
    formModule,
    listModule,
    othersModule,
    testModule
]);
module.exports = 'app.demo';