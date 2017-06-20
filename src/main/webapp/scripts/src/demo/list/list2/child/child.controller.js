angular.module('app.demo.list')
    .controller('app.demo.list.List2ChildCtrl', ['$scope', '$location', '$state', 'common', 'app.demo.list.ListService',
        function ($scope, $location, $state, Common, ListService) {
            console.log('app.demo.list.List2ChildCtrl');
            // 数据列表  [必须]
            $scope.itemList = [];
            // 分页数据  [必须]
            $scope.pagination = {
                page: 1,
                size: 10,
                totalPage: 1,
                total: 0
            };
            // 搜索条件列表  [必须]
            $scope.searchForm = {
                name: '',
                key: ''
            };
            //搜索
            $scope.search = function () {
                if (!$scope.validForm()) {
                    return;
                }
                $scope.pagination.page = 1;
                refreshUrl();
            };
            //  修改当前页码  [必须]
            $scope.pageChanged = function (page) {
                if (!$scope.validForm()) {
                    return;
                }
                $scope.pagination.page = page;
                refreshUrl();
            };
            // 改变分页大小  [必须]
            $scope.changePageSize = function (size) {
                if (!$scope.validForm()) {
                    return;
                }
                if (size !== $scope.pagination.size) {
                    // page 重置为 1
                    $scope.pagination.size = size;
                    $scope.pagination.page = 1;
                    // 查询第一页
                    refreshUrl();
                }
            };
            $scope.validForm = function () {
                return $scope.formValidator.$valid;
            };

            function getList() {
                var page = $scope.pagination.page;
                var size = $scope.pagination.size;
                ListService.getDemoTableList($scope.searchForm, page, size).then(function (data) {
                    angular.extend($scope.pagination, data.pagination);
                    $scope.itemList = data.result;
                }, function () { });
            }

            function refreshUrl() {
                var urlParams = angular.extend({ rnd: Date.now() }, $scope.searchForm, $scope.pagination);
                $state.go('demo-list-list2.child', urlParams);
            };
            Common.parseUrl($location, $scope.searchForm, $scope.pagination, { __formatParams: 1, begindatetime: 'number', enddatetime: 'number' });
            getList();

            $scope.deleteItems = function () {
                var items = $scope.getSelectedItems();
                alert('要删除的items:' + items);
            };
            $scope.exportItems = function () {
                alert('导出');
            };
        }
    ])