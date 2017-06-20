angular.module('app.shared')
    .directive('fixieselect', ['$timeout',function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            if (!document.all) return;
            var selectEle = element[0];
            $timeout(function(){
                var option = document.createElement("option");
                selectEle.add(option, null);
                selectEle.remove(selectEle.options.length - 1);
            },0);
        }
    };
}]);