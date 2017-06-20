angular.module('app.global')
    .controller('app.global.UnauthorizedCtrl', ['$scope', function ($scope) {
        $scope.tip = '您还没有权限访问该页面,请联系管理员开通！';
    }]);
