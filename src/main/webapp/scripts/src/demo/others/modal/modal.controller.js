angular.module('app.demo.others')
    .controller('app.demo.others.ModalCtrl', ['$scope', 'SharkModal', 'SharkToastr',
        function ($scope, SharkModal, SharkToastr) {
            $scope.confirm = function () {
                SharkModal.confirm({
                    title: '提醒',
                    content: '确定要删除吗？'
                }).then(function(){
                    SharkToastr.success('删除成功');
                },function(){
                    SharkToastr.error('取消');
                });
            };
            $scope.alert = function () {
                SharkModal.alert({
                    title: '提醒',
                    content: '请注意！'
                }).then(function(){
                    SharkToastr.success('好的');
                },function(){
                    SharkToastr.error('取消');
                });
            };
            // 打开弹窗
            $scope.openDialog = function (size) {
                SharkModal.open({
                    animation: true,
                    template: require('./dialog.html'),
                    controller: 'app.demo.others.DialogCtrl',
                    size: size,
                    resolve: {
                        params: function () {
                            return { name: 'admin' };
                        }
                    }
                }).then(function () {
                    SharkToastr.success('确定');
                }, function () {
                    SharkToastr.success('取消');
                });
            };


            $scope.toastrSuccess = function () {
                SharkToastr.success('保存成功！');
            }
            $scope.toastrError = function () {
                SharkToastr.error('保存失败！');
            }
        }
    ]);
