angular.module('app.demo.form', []);
//controller
require('./form1/form1.controller');
require('./form2/form2.controller');
//directive
require('./compile.directive');
require('./countchars.directive');
//router
require('./router');
module.exports = 'app.demo.form';