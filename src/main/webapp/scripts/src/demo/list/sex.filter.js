angular.module('app.demo.list')
    .filter('demoListSex', [function () {
        return function (v) {
            if (v === 0) {
                return '男';
            }
            else if (v === 1) {
                return '女';
            }
            else {
                return '不明';
            }
        };
    }]);
