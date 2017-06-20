angular.module('app.demo.list')
    .controller('app.demo.list.List2ChildCtrl', ['$scope', '$state',
        function ($scope, $state) {
            console.log($state.params.refreshtime);
            $scope.time = $state.params.refreshtime;
            $scope.refresh = function () {
                $state.go('demo-list-list2.child', {
                    refreshtime: Date.now()
                });
            }
        }
    ])