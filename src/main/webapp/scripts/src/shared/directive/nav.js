angular.module('app.shared')
    .controller('GlobalNavCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {
        this.setInitElement = function (ele) {
            $scope.initElementJq = ele;
        };
        $scope.go = function (state) {
            if ($scope.currentState === state) {
                return;
            };
            $state.go(state);
        };
        var unsubscribe = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.currentState = toState.name;
            /*
            切换左侧导航的选中状态
            */
            //移除原先选中的菜单
            $scope.initElementJq.find('a').removeClass('active');
            //选中菜单
            var query = 'a[nav-module=' + $scope.currentState.split('.')[0] + ']';
            var navLink = $scope.initElementJq.find(query);
            navLink.addClass('active');
            //展开所在菜单组
            var groupWrap = navLink.parent();
            if (groupWrap.is(':hidden')) {
                groupWrap.slideDown(200);
            }
        });
        $scope.$on('$destroy', function () {
            //scope销毁时移除监听stateChangeSuccess
            unsubscribe();
        });
    }])
    .directive('nav', ['$state', '$rootScope', function ($state, $rootScope) {
        return {
            restrict: 'A',
            controller: 'GlobalNavCtrl', //与GlobalNavCtrl共用一个scope
            compile: function (tElem, tAttrs) {
                SharkUI.$(tElem).find('.js-group-title').on('click', function (e) {
                    SharkUI.$(e.currentTarget).next('.js-group-wrap').slideToggle(200);
                });
                return function ($scope, element, attrs, ctrl) {
                    ctrl.setInitElement(SharkUI.$(element));
                }
            }
        };
    }])
    .directive('menuCollapse', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
        return {
            restrict: 'A',
            compile: function (tElem) {
                var leftMenuJq = SharkUI.$('#js-left-menu');
                SharkUI.$(tElem).on('click', function () {
                    if (leftMenuJq.width() == 0) {
                        leftMenuJq.width('180px');
                    } else {
                        leftMenuJq.width(0);
                    }
                    $timeout(function () {
                        $rootScope.$broadcast('resize');
                    }, 500)
                });
            }
        };
    }]);
