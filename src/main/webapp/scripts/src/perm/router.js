angular.module('app.perm')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('perm-role', {
                    url: '/perm-role',
                    template: require('./role/role.html'),
                    controller: 'app.perm.RoleCtrl',
                    permission: 'perm-role'
                })
                .state('perm-user', {
                    url: '/perm-user',
                    template: require('./user/user.html'),
                    controller: 'app.perm.UserCtrl',
                    permission: 'perm-user'
                })
        }
    ]);