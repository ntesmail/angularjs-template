angular.module('app.demo.test')
    .controller('app.demo.test.TestCtrl', ['$scope', '$parse', '$timeout', '$http', 'app.demo.test.Calculator', 'app.demo.test.Currency1', 'app.demo.test.Currency2',
        function ($scope, $parse, $timeout, $http, Calculator, Currency1, Currency2) {
            /*********test begin 测试哪些情况会触发angular的$apply**************/
            //DOM事件，$q.defer(),$timeout,$http,主动$apply等 ---> 进入$digest循环
            // 手动setTimeout，不会改变
            // setTimeout(function(){
            //     console.log('-------end--------');
            //     $scope.locationUrl = 'uib1';
            // },5000);
            // 使用angular的$timeout，会改变
            $timeout(function () {
                console.log('-------end--------');
                $scope.locationUrl = 'uib2';
            }, 5000);
            //经过第三方插件jquery，不会改变
            // setTimeout(function(){
            //     $.ajax({
            //         url: 'xhr/admin/getPermList.json',
            //         type: 'POST',
            //         dataType: 'json',
            //         success: function(res) {
            //             console.log('-------end--------');
            //             $scope.locationUrl = 'uib3';
            //         }
            //     });
            // },5000);
            //经过angular的$http，会改变
            // setTimeout(function(){
            //     $http({
            //         url: 'xhr/admin/getPermList.json',
            //         method: 'POST'
            //     }).success(function() {
            //         console.log('-------end--------');
            //         $scope.locationUrl = 'uib4';
            //     });
            // },5000)
            /*********test end**************/

            /*********test begin provide、factory、service、value、constant**************/
            console.log(Currency1);
            console.log(Currency2);
            console.log(Calculator.add(3, 4));
            /*********test end**************/

            //如果你在调用$scope.$watch时只为它传递了一个参数，无论作用域中的什么东西发生了变化，这个函数都会被调用。
            $scope.$watch(function () {
                console.log(new Date().getTime());
            });

            /*********test begin 测试$parse 将一个AngularJS表达式转换成一个函数 **************/
            $scope.log = function (v) {
                console.log(v);
            };
            // var expression = 'log("hello world");';
            var displayName = 'displayName';
            var expression = displayName + '=value';
            var parseFunc = $parse(expression)($scope, { value: 'hello world' });
            /*********test end**************/
        }
    ])
