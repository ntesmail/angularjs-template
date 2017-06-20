angular.module('app.perm')
    .factory('app.perm.PermService', [
        function () {
            var AppPermList = [
                {
                    node_id: 'perm',
                    node_name: '权限管理',
                    children: [{
                        node_id: 'perm-user',
                        node_name: '用户管理'
                    }, {
                        node_id: 'perm-role',
                        node_name: '角色管理'
                    }]
                }
            ];
            var permMap = {};
            var userInfo = {};
            function initPerm(nodes, permMap) {
                if (!angular.isArray(nodes) || nodes.length === 0)
                    return;
                for (var i = 0; i < nodes.length; i++) {
                    permMap[nodes[i].node_id] = nodes[i];
                    initPerm(nodes[i].children, permMap);
                }
            }
            var service = {
                setAppPermList: function (list) {
                    AppPermList = list;
                },
                getAppPermList: function (list) {
                    return AppPermList;
                },
                setUserInfo: function (info) {
                    userInfo = info;
                    initPerm(AppPermList, permMap);
                    for (var i = 0; i < info.permission.length; i++) {
                        var permission = info.permission[i];
                        permMap[permission] ? permMap[permission].hasPermission = true : '';
                    }
                },
                getUserInfo: function (list) {
                    return userInfo;
                },
                hasPermission: function (permission, type) {
                    if (userInfo.roleType === 0) {
                        //超级管理员
                        return true;
                    }
                    else if (angular.isArray(permission)) {
                        if (typeof type === 'undefined' || type === '||') {
                            var flag = false;
                            for (var i = 0; i < permission.length; i++) {
                                if (permMap[permission[i]] && permMap[permission[i]].hasPermission) {
                                    flag = true;
                                    break;
                                }
                            }
                            return flag;
                        }
                        else if (type === '&&') {
                            var flag = true;
                            for (var i = 0; i < permission.length; i++) {
                                if (!permMap[permission[i]] || !permMap[permission[i]].hasPermission) {
                                    flag = false;
                                    break;
                                }
                            }
                            return flag;
                        }
                    }
                    else if (typeof permission !== 'undefined' && permission !== null && permission !== '') {
                        if (permMap[permission] && permMap[permission].hasPermission) {
                            return true;
                        }
                    }
                    return false;
                }
            };
            return service;
        }
    ]);

