angular.module('app.demo.test')
    .value('app.demo.test.Currency1', 'CN')
    .value('app.demo.test.Currency1', 'CN1')
    .constant('app.demo.test.Currency2', 'EN')
    .constant('app.demo.test.Currency2', 'EN1')
    .provider("app.demo.test.Calculator", [
        function () {
            var currency = "美元";
            this.setLocal = function (l) {
                currency = l;
            };
            this.$get = function () {
                return {
                    getLocal: function () {
                        return currency;
                    },
                    add: function (a, b) {
                        return (a + b) + this.getLocal();
                    },
                    subtract: function (a, b) {
                        return (a - b) + this.getLocal();
                    },
                    multiply: function (a, b) {
                        return (a * b) + this.getLocal();
                    },
                    divide: function (a, b) {
                        return (a / b) + this.getLocal();
                    }
                }
            };
        }
    ])
    .config(['$provide', 'app.demo.test.CalculatorProvider', function ($provide, calculatorProvider) {
        //decorator可以装饰除了constant之外的任何service的，并且可以提供类似于后端的AOP概念的编程的效果。
        $provide.decorator('app.demo.test.Currency1', ['$delegate', function ($delegate) {
            return $delegate + ' - china';
        }]);
        $provide.decorator('app.demo.test.Calculator', ['$delegate', function ($delegate) {
            var fn = $delegate.add;
            $delegate.add = function () {
                console.log('beigin add');
                return fn.apply($delegate, arguments);
            };
            return $delegate;
        }]);
        calculatorProvider.setLocal("人民币");
    }]);