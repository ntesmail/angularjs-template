var AppConfig = {
    contextPath: '/template-angularjs',
    perms: [
        //所有权限都放在叶子节点（没有children的节点）
        {
            node_id: 'form',
            node_name: '表单',
            children: [{
                node_id: 'form-from1',
                node_name: 'form1'
            }, {
                node_id: 'form-from2',
                node_name: 'from2'
            }]
        },
        {
            node_id: 'list',
            node_name: '列表',
            children: [{
                node_id: 'list-list1',
                node_name: 'list1',
                children: [{
                    node_id: 'list-list1-query',
                    node_name: '查询'
                }, {
                    node_id: 'list-list1-detail',
                    node_name: '详情'
                }]
            }, {
                node_id: 'list-list2',
                node_name: 'list2'
            }]
        },
        {
            node_id: 'others',
            node_name: '其他',
            children: [{
                node_id: 'others-modal',
                node_name: '弹窗'
            }, {
                node_id: 'others-todos',
                node_name: 'todos'
            }]
        },
        {
            node_id: 'test',
            node_name: '测试',
            children: [{
                node_id: 'test-apply',
                node_name: '测试apply'
            }]
        },
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
    ],
    validtext: {
        nameunique: '名称已存在',
        ilovechina: '备注需包含：我爱中国',
        percentTotal: '百分比总和需为100%',
        frontgroup: '必须是前端组',
        habitsrequired: '爱好必须选一个',
        female: '性别必须为女'
    }
}
module.exports = AppConfig;