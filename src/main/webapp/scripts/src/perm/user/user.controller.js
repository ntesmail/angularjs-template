angular.module('app.perm')
    .controller('app.perm.UserCtrl', ['$scope', 'ajax',
        function ($scope, Ajax) {
            function getList() {
                Ajax.post('/xhr/perm/getUsers.json').then(function (data) {
                    $scope.itemList = data.result;
                }, function () { });
            }
            getList();
        }
    ]);
