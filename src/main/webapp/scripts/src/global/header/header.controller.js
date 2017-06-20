angular.module('app.global')
    .controller('app.global.HeaderCtrl', ['$scope', 'app.perm.PermService', function ($scope, PermService) {
        $scope.uid = PermService.getUserInfo().uid;
    }]);
