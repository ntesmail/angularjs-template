var AppConfig = require('../../config');
angular.module('app.shared')
    .factory('ajax', ['$q', '$http', '$httpParamSerializer', 'common',
        function ($q, $http, $httpParamSerializer, Common) {
            var service = {
                //ajax缓存
                ajaxCache: {},
                //ajax缓存时间，默认10分钟
                ajaxCacheTime: 1000 * 60 * 10,
                isCacheExpired: function (cacheObj, time) {
                    return Date.now() - cacheObj.timestamp <= time ? false : true;
                },
                getCache: function (url, params, cache) {
                    if (cache) {
                        var cacheArr = service.ajaxCache[url];
                        if (cacheArr) {
                            var time = typeof cache === 'number' ? cache : service.ajaxCacheTime;
                            for (var i = 0; i < cacheArr.length; i++) {
                                var cacheObj = cacheArr[i];
                                if (service.isCacheExpired(cacheObj, time)) {
                                    cacheArr.splice(i, 1);
                                    --i;
                                    continue;
                                }
                                if (Common.isEqual(params, cacheObj.params)) {
                                    return cacheObj;
                                }
                            }
                            return null;
                        }
                        else {
                            return null;
                        }
                    }
                    else {
                        return null;
                    }
                },
                /**
                 * get方式获取数据
                 * @param  {[string]} url    [请求的url]
                 * @param  {[object]} params [可选，请求的参数]
                 * @param  {[boolean|number]} cache  [可选，是否缓存，true或者false，也可以设置具体的缓存时间]
                 * @return {[promise]}        [promise]
                 */
                get: function (url, params, cache) {
                    if (typeof params === 'number' || typeof params === 'boolean') {
                        //兼容无params参数的情况
                        cache = params;
                        params = null;
                    }
                    var config = {
                        method: 'GET',
                        url: AppConfig.contextPath + url + (params ? ('?' + $httpParamSerializer(params)) : ''),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        data: params || {}
                    };
                    var ca = cache || false;
                    return service.request(config, ca);
                },
                //post方式获取数据
                post: function (url, params, cache) {
                    if (typeof params === 'number' || typeof params === 'boolean') {
                        cache = params;
                        params = null;
                    }
                    var config = {
                        method: 'POST',
                        url: AppConfig.contextPath + url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        data: $httpParamSerializer(params || {})
                    };
                    var ca = cache || false;
                    return service.request(config, ca);
                },
                //request payload方式获取数据
                postByJson: function (url, params, cache) {
                    if (typeof params === 'number' || typeof params === 'boolean') {
                        cache = params;
                        params = null;
                    }
                    var config = {
                        method: 'POST',
                        url: AppConfig.contextPath + url,
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                        },
                        data: params || {}
                    };
                    var ca = cache || false;
                    return service.request(config, ca);
                },
                request: function (config, cache) {
                    var deferred = $q.defer();
                    var cacheObj = service.getCache(config.url, config.data, cache);
                    if (cacheObj !== null) {
                        deferred.resolve(Common.copy(cacheObj.data));
                    }
                    else {
                        $http(config).then(function (httpResult) {
                            var httpData = httpResult.data;
                            if (httpData && httpData.code === 200) {
                                if (cache) {
                                    var cacheArr = service.ajaxCache[config.url] || [];
                                    httpData.timestamp = Date.now();
                                    httpData.params = config.data;
                                    cacheArr.push(Common.copy(httpData));
                                    service.ajaxCache[config.url] = cacheArr;
                                }
                                deferred.resolve(httpData.data);
                            } else {
                                deferred.reject(httpResult);
                            }
                        }, function (error) {
                            deferred.reject(error);
                        })
                    }
                    return deferred.promise;
                }
            };
            return service;
        }
    ]);
