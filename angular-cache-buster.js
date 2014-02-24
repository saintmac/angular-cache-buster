angular.module('ngCacheBuster', [])
  .config(function($httpProvider) {
    return $httpProvider.interceptors.push('httpRequestInterceptorCacheBuster');
  })
  .provider('httpRequestInterceptorCacheBuster', function() {
    this.viewsDirectoryName = "view";
    this.logRequests = false;

    this.setViewsDirectoryName = function(name) {
      this.viewsDirectoryName = name;
    };

    this.setLogRequests = function(logRequests) {
      this.logRequests = logRequests;
    };

    this.$get = function($q, $log) {
      var viewsDirectoryName = this.viewsDirectoryName;
      var logRequests = this.logRequests;

      return {
        'request': function(config) {
          if (config.url.indexOf(viewsDirectoryName) === -1) {
            var d = new Date();
            config.url = config.url + '?cacheBuster=' + d.getTime();
          }
          if (logRequests) {
            $log.info('request.url =' + config.url);
          }
          return config || $q.when(config);
        }
      };
    };
  });


