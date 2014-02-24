angular.module('ngCacheBuster', [])
  .config(function($httpProvider) {
    return $httpProvider.interceptors.push('httpRequestInterceptorCacheBuster');
  })
  .factory('httpRequestInterceptorCacheBuster', function($q, $log) {
    return {
      'request': function(config) {
        if (config.url.indexOf("view") === -1) {
          var d = new Date();
          config.url = config.url + '?cacheBuster=' + d.getTime();
        }
        $log.info('request.url =' + config.url);
        return config || $q.when(config);
      }
    };
  });


