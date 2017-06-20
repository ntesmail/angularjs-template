angular.module('app.perm')
    .controller('app.perm.RoleEditCtrl', ['$scope', 'modalInstance', 'app.perm.PermService', 'params',
        function ($scope, modalInstance, PermService, params) {
            $scope.treeData = PermService.getAppPermList();
            $scope.preSelectedPermIds = params.perms;
            $scope.title = params.type === 'edit' ? '编辑角色' : '新建角色';
            $scope.roleName = params.name;
            // 全选
            $scope.checkAll = function () {
                $scope.permTree.checkAll();
            };
            // 反选
            $scope.reverseCheck = function () {
                $scope.permTree.reverseCheck();
            };
            // 全不选
            $scope.unCheckAll = function () {
                $scope.permTree.checkNo();
            };
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
            $scope.ok = filterValid(function () {
                var permArr = [];
                var selectedNodes = $scope.permTree.getCheckedNodes();
                console.log({
                    name: $scope.roleName,
                    perms: selectedNodes
                });
                modalInstance.close();
            });
            $scope.cancel = function () {
                modalInstance.dismiss();
            };
        }
    ])