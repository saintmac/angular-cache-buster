angular.module('ngCacheBuster', [])
  .config(function($httpProvider) {
    return $httpProvider.interceptors.push('httpRequestInterceptorCacheBuster');
  })
  .provider('httpRequestInterceptorCacheBuster', function() {
    this.viewsDirectoryName = "view";

    this.setViewsDirectoryName = function(name) {
      this.viewsDirectoryName = name;
    };

    this.$get = function($q, $log) {
      var viewsDirectoryName = this.viewsDirectoryName;

      return {
        'request': function(config) {
          if (config.url.indexOf(viewsDirectoryName) === -1) {
            var d = new Date();
            config.url = config.url + '?cacheBuster=' + d.getTime();
          }
          $log.info('request.url =' + config.url);
          return config || $q.when(config);
        }
      };
    };
  });


