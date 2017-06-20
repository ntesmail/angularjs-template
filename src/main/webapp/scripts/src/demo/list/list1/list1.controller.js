angular.module('app.demo.list')
    .controller('app.demo.list.List1Ctrl', ['$scope', '$location', '$state', 'common', 'UserData', 'app.demo.list.ListService',
        function ($scope, $location, $state, Common, UserData, ListService) {
            $scope.userInfo = UserData;
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
                begindatetime: null,
                enddatetime: null,
                name: '',
                key: ''
            };
            $scope.daterange = [null, null];

            // 校验通过后再查询
            function filterValid(fn) {
                return function () {
                    if ($scope.validator) {
                        $scope.validator.doValidate();
                        if (!$scope.validator.isPendding() && $scope.validator.isValid()) {
                            fn();
                        }
                    } else {
                        fn();
                    }
                }
            };
            // 搜索
            $scope.search = filterValid(function () {
                $scope.pagination.page = 1;
                refreshUrl();
            });
            // 修改当前页码  [必须]
            $scope.pageChanged = filterValid(function (page) {
                $scope.pagination.page = page;
                refreshUrl();
            });
            // 改变分页大小  [必须]
            $scope.changePageSize = filterValid(function (size) {
                if (size !== $scope.pagination.size) {
                    // page 重置为 1
                    $scope.pagination.size = size;
                    $scope.pagination.page = 1;
                    // 查询第一页
                    refreshUrl();
                }
            });
            $scope.getList = filterValid(function () {
                var page = $scope.pagination.page;
                var size = $scope.pagination.size;
                ListService.getDemoTableList($scope.searchForm, page, size).then(function (data) {
                    angular.extend($scope.pagination, data.pagination);
                    $scope.itemList = data.result || [];
                }, function () { });
            });

            function refreshUrl() {
                $scope.searchForm.begindatetime = $scope.daterange[0];
                $scope.searchForm.enddatetime = $scope.daterange[1];
                var urlParams = angular.extend({}, $scope.searchForm, $scope.pagination);
                $state.go('demo-list-list1', urlParams, { reload: true });
            };
            Common.parseUrl($state, $scope.searchForm, $scope.pagination);
            $scope.daterange = [$scope.searchForm.begindatetime, $scope.searchForm.enddatetime];
            $scope.getList();


            // 删除
            $scope.deleteItems = function () {
                var selectedItems = $scope.getSelectedItems();
                var arr = [];
                selectedItems.forEach(function (item) {
                    arr.push(item.name);
                });
                if (arr.length > 0) {
                    alert('要删除的项为：' + arr.join(','));
                }
                else {
                    alert('请先选择要删除的项');
                }
            };

            // 查看详情
            $scope.detail = function (id) {
                $state.go('demo-list-list1-detail', { id: id });
            };
        }
    ]);