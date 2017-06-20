angular.module('app.demo.list')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('demo-list-list1', {
                    url: '/demo-list-list1?rnd&page&size&key&name&begindatetime&enddatetime',
                    template: require('./list1/list1.html'),
                    controller: 'app.demo.list.List1Ctrl',
                    permission: 'list-list1-query',
                    resolve: {
                        UserData: ['$timeout', '$q', function ($timeout, $q) {
                            //完成费操作后才会渲染controller
                            var defer = $q.defer();
                            $timeout(function () {
                                defer.resolve({ id: 'xx', name: 'sweetyx' });
                            }, 0);
                            return defer.promise;
                        }]
                    }
                })
                .state('demo-list-list1-detail', {
                    url: '/demo-list-list1-detail?id',
                    template: require('./list1/detail/detail.html'),
                    controller: 'app.demo.list.List1DetailCtrl',
                    permission: 'list-list1-detail'
                })
                .state('demo-list-list2', {
                    url: '/demo-list-list2',
                    template: require('./list2/list2.html'),
                    controller: 'app.demo.list.List2Ctrl',
                    permission: 'list-list2'
                })
                .state('demo-list-list2.child', {
                    url: '/child?rnd&page&size&key&name',
                    template: require('./list2/child/child.html'),
                    controller: 'app.demo.list.List2ChildCtrl',
                    permission: 'list-list2'
                })
        }
    ]);