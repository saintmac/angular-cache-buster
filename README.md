Cache Buster for Angular JS $http and $resource.
Especially useful with Internet Explorer (IE8, IE9)

# install

    bower install angular-cache-buster --save

In your app module definition, add `ngCacheBuster` as a dependency

    angular.module('myApp', ['ngCacheBuster']);

# configure

AngularCacheBuster adds a cache buster to any $http requests (and hence to $resource requests).
Since you probably want to maintain browser caching for your views, by default AngularCacheBuster doesn't add a cache buster to requests to URLs that contain 'view'.

If your views are not in a 'view' directory you can change that behavior by configuring AngularCacheBuster provider.
For instance, if your views are in a 'partials' folder, you can configure AngularCacheBuster this way:

    angular.module('yourApp', ['ngCacheBuster'])
      .config(function(httpRequestInterceptorCacheBusterProvider){
        httpRequestInterceptorCacheBusterProvider.setViewsDirectoryName('partials');
      });

# use

That's it! All your resource calls will have a cache buster added, except for urls containing 'views'