angular.module('app.demo.list')
    .controller('app.demo.list.List1DetailCtrl', ['$scope', '$state',
        function ($scope, $state) {
            console.log('参数：', $state.params);
            $scope.id = $state.params.id;
        }
    ]);