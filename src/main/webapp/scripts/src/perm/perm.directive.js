angular.module('app.perm')
    .directive('adminPerm', ['app.perm.PermService', function (PermService) {
        function authorizeChildEles(tElem) {
            for (var i = 0; i < tElem.length; i++) {
                var element = angular.element(tElem[i]);
                var permNos = eval(element.attr('perm-no'));
                var permType = element.attr('perm-type');
                if (typeof permNos !== 'undefined') {
                    if (!PermService.hasPermission(permNos, permType)) {
                        element.remove();
                    }
                } else {
                    authorizeChildEles(element.children());
                    var childEles = element.children();
                    if (0 === childEles.length) {
                        //子元素全部隐藏时，本身也隐藏
                        element.remove();
                    }
                }
            }
        }
        return {
            restrict: 'A',
            compile: function (tElem) {
                authorizeChildEles(tElem);
            }
        };
    }]);
