angular.module('app.demo.others')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('demo-others-modal', {
                    url: '/demo-others-modal',
                    template: require('./modal/modal.html'),
                    controller: 'app.demo.others.ModalCtrl',
                    permission: 'others-modal'
                })
                .state('demo-others-todos', {
                    url: '/demo-others-todos',
                    template: require('./todos/todos.html'),
                    controller: 'app.demo.others.TodoCtrl',
                    permission: 'others-todos'
                })
        }
    ]);