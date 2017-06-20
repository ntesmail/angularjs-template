angular.module('app.demo.list')
    .factory('app.demo.list.ListService', ['ajax',
        function (Ajax) {
            var service = {
                /**
                 * 获取demo的列表数据
                 * @param  {[{key:''}]}
                 * @param  {[int]}
                 * @param  {[int]}
                 * @return {[promise]}
                 */
                getDemoTableList: function (searchForm, page, size) {
                    var params = {
                        key: searchForm.key,
                        name: searchForm.key,
                        begindatetime: searchForm.begindatetime,
                        enddatetime: searchForm.enddatetime,
                        page: page,
                        size: size
                    };
                    return Ajax.post('/xhr/demo/getDemoTableList.json', params);
                }
            };
            return service;
        }
    ]);