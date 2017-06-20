angular.module('app.demo.test')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('demo-test', {
                    url: '/demo-test',
                    template: require('./test.html'),
                    controller: 'app.demo.test.TestCtrl',
                    permission: 'test-apply'
                })
        }
    ]);