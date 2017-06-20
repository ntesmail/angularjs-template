/**
 * @ngdoc controller
 * @description
 * @author zhanghao
 */
angular.module('app.demo.form')
    .controller('app.demo.form.Form2Ctrl', ['$scope', '$sce', function ($scope, $sce) {
        $scope.formData = {
            file: null,
            remark: "备注",
            html: $sce.trustAsHtml('<div style="color:red;">我是有样式的html</div>'),
            unitList: [{
                name: '运营部'
            }, {
                name: '市场部'
            }, {
                name: '集团部'
            }, {
                name: '人事部'
            }],
            name: '王少',
            email: 'sweetyx',
            emailsuffix: 101,
            amount: 100
        };
        $scope.emailsuffixs = [{
            value: 100,
            name: '163.com'
        }, {
            value: 101,
            name: 'qq.com'
        }, {
            value: 102,
            name: 'gmail.com'
        }];
        //文件上传
        $scope.onSelected = function () {
            console.log(arguments);
        };
        $scope.onUploading = function () {
            console.log(arguments);
        };
        $scope.onUploaded = function (file) {
            alert('上传成功');
        };
        $scope.onFailed = function () {
            console.log(arguments);
        };
        //删除item
        $scope.removeItem = function (index) {
            $scope.formData.unitList.splice(index, 1);
        };
    }]);
