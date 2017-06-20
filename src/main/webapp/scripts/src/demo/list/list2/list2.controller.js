angular.module('app.demo.list')
    .controller('app.demo.list.List2Ctrl', ['$scope', '$location', '$state', 'common',
        function ($scope, $location, $state, Common) {
            console.log('父容器初始化...');
            $scope.active = 1;
            $scope.time = Date.now();
            $scope.tabs = [{
                title: '前端组',
                template: '<div ui-view></div>'
            }, {
                title: '视觉组',
                template: '<div>视觉组成员查询：</div>'
            }];
            $scope.tabSwitch = function (index) {
                console.log('tab切换到：' + index);
            };
            $state.go('demo-list-list2.child');
        }
    ])