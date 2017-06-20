angular.module('app.demo.form')
    .directive('demoFormCompile', ['ajax', '$compile', function (Ajax, $compile) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                Ajax.post(attrs.url).then(function (data) {
                    element.html(data);
                    $compile(element.contents())($scope);
                });
            }
        };
    }]);