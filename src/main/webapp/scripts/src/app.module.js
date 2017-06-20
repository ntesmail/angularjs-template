var AppConfig = require('./config');
var sharedModule = require('./shared/shared.module');
var globalModule = require('./global/global.module');
var permModule = require('./perm/perm.module');
var demoModule = require('./demo/demo.module');
angular.module('adminApp', [
    'ngSanitize',
    'ui.router',
    'shark-angularjs.ui',
    sharedModule,
    globalModule,
    permModule,
    demoModule
]).run(['$rootScope', '$state', 'app.perm.PermService', 'SharkValidConfig', function ($rootScope, $state, PermService, SharkValidConfig) {
    //设置权限相关
    PermService.setAppPermList(AppConfig.perms);
    PermService.setUserInfo(window.userInfo);
    window.userInfo = null;
    // 设置校验规则
    SharkValidConfig.setRules(AppConfig.validtext);
    //重置$state.go方法
    var go = $state.go;
    var fn = function (to, params, options) {
        console.log('switch state');
        go(to, params, options);
    };
    $state.go = fn;
    //判断当前用户是否有权限访问该页面
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        var permission = toState.permission;
        if (angular.isDefined(permission) && !PermService.hasPermission(permission)) {
            //没有权限时，统一跳转到unauthorized页面
            event.defaultPrevented = true;
            $state.go('unauthorized');
            return false;
        }
    });
}]);
angular.element(document).ready(function () {
    SharkUI.$.ajax({
        url: AppConfig.contextPath + '/xhr/admin/getInfo.json',
        type: 'POST',
        dataType: 'json',
        success: function (res) {
            if (res.code === 200) {
                window.userInfo = res.data;
                angular.bootstrap(document, ['adminApp']);
            } else {
                alert('初始化权限信息失败！');
            }
        },
        error: function () {
            alert('初始化权限信息失败！');
        }
    });
});

