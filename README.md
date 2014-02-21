Cache Buster for Angular JS $http and $resource.
Especially useful with Internet Explorer (IE8, IE9)

# install

    bower install angular-cache-buster --save

In your app module definition, add `ngCacheBuster` as a dependency

    angular.module('myApp', ['ngCacheBuster]);

# use

That's it! All your resource calls will have a cache buster added, except for urls containing 'views'