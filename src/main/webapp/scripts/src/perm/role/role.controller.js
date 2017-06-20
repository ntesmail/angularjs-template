angular.module('app.perm')
    .controller('app.perm.RoleCtrl', ['$scope', 'SharkModal', 'ajax',
        function ($scope, SharkModal, Ajax) {
            function getList() {
                Ajax.post('/xhr/perm/getRoles.json').then(function (data) {
                    $scope.itemList = data.result;
                }, function () { });
            }
            getList();

            $scope.addRole = function () {
                var SharkModalInstance = SharkModal.open({
                    animation: true,
                    template: require('./edit.html'),
                    controller: 'app.perm.RoleEditCtrl',
                    resolve: {
                        params: function () {
                            return {
                                type: 'add',
                                name: '',
                                perms: []
                            };
                        }
                    }
                });
                SharkModalInstance.then(function () { }, function () { });
            }
            $scope.editRole = function (item) {
                var SharkModalInstance = SharkModal.open({
                    animation: true,
                    template: require('./edit.html'),
                    controller: 'app.perm.RoleEditCtrl',
                    resolve: {
                        params: function () {
                            return {
                                type: 'edit',
                                name: item.name,
                                perms: item.permission
                            };
                        }
                    }
                });
                SharkModalInstance.then(function () { }, function () { });
            }
        }
    ]);
