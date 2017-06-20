angular.module('app.shared')
    .factory('common', [
        function () {
            var service = {
                ipRegExp: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                numRegExp: /^\d{1,}$/,
                phoneRegExp: /^((\+?86)|(\(\+86\)))?1[3|4|5|6|7|8]\d{9}$/,
                emailRegExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                /**
                 * 从url中获取参数幅值给页面
                 * @param  {[type]} $state 页面的$state对象
                 * @param  {[type]} object ...不定参数
                 * @no return
                 */
                parseUrl: function ($state) {
                    var params = $state.params;
                    var formats = { asc: 'boolean', size: 'number', page: 'number' };
                    var length = arguments.length;
                    if (arguments[arguments.length - 1].__formatParams === 1) {
                        formats = angular.extend(formats, arguments[arguments.length - 1]);
                        length = arguments.length - 1;
                    }
                    for (var i = 1; i < length; i++) {
                        for (var p in arguments[i]) {
                            if (typeof params[p] !== "undefined") {
                                //格式转换
                                if (formats[p] === "number" || p.indexOf('date') > 0)
                                    arguments[i][p] = Number(params[p]) || 0;
                                else if (formats[p] === "boolean")
                                    arguments[i][p] = (params[p] === "true" || params[p] === true ? true : false);
                                else
                                    arguments[i][p] = params[p];
                            }
                        }
                    }
                },
                //创建一个唯一标识
                createUUID: (function () {
                    var index = 0;
                    return function () {
                        return 'uuid-x'.replace(/x/, index++);
                    };
                })(),
                //判断对象是否为空
                isEmpty: function (v) {
                    if (typeof v === "undefined" || v === null || v === "")
                        return true;
                    else
                        return false;
                },
                /**
                 * 解析url参数key对应的键值
                 * @param  {[string]} url   [url地址]
                 * @param  {[string]} key   [参数名]
                 * @return {[string]}       [参数值]
                 */
                getQueryString: function (url, key) {
                    var t = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
                    var index = url.indexOf('?');
                    var n = url.substr(index + 1).match(t);
                    if (n != null) {
                        return unescape(n[2]);
                    };
                    return '';
                },
                apply: function (scope) {
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                },
                inArray: function (obj, array, key) {
                    for (var i = 0; i < array.length; i++) {
                        if (typeof key !== 'undefined') {
                            if (array[i][key] === obj[key]) {
                                return i;
                            }
                        }
                        else {
                            if (array[i] === obj) {
                                return i;
                            }
                        }
                    }
                    return -1;
                },
                isEqual: function (x, y) {
                    var in1 = x instanceof Object;
                    var in2 = y instanceof Object;
                    if (!in1 || !in2) {
                        return x === y;
                    }
                    if (Object.keys(x).length !== Object.keys(y).length) {
                        return false;
                    }
                    for (var p in x) {
                        var a = x[p] instanceof Object;
                        var b = y[p] instanceof Object;
                        if (a && b) {
                            return this.isEqual(x[p], y[p]);
                        }
                        else if (x[p] !== y[p]) {
                            return false;
                        }
                    }
                    return true;
                },
                copy: function (source) {
                    if (source !== null && typeof source === 'object') {
                        if (source.constructor === Object) {
                            var result = {};
                            for (var key in source) {
                                result[key] = service.copy(source[key]);
                            }
                            return result;
                        }
                        else if (source.constructor === Array) {
                            var result = [];
                            source.forEach(function (item) {
                                result.push(service.copy(item));
                            });
                            return result;
                        }
                    }
                    else {
                        return source;
                    }
                }
            };
            return service;
        }
    ]);
