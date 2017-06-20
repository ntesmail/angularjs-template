angular.module('app.global')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
            //ui-router路由配置
            $stateProvider.state('home', {
                url: '/home',
                template: require('./home/home.html'),
                controller: 'app.global.HomeCtrl'
            }).state('unauthorized', {
                url: '/unauthorized',
                template: require('./unauthorized/unauthorized.html'),
                controller: 'app.global.UnauthorizedCtrl'
            })
        }
    ]);