angular.module('app.shared', []);
//service
require('./service/common');
require('./service/ajax');
//filter
require('./filter/async');
//directives
require('./directive/fixieselect');
require('./directive/nav');
module.exports = 'app.shared';