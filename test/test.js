describe('ngCacheBuster', function () {
  describe('without configuring the provider', function() {
    beforeEach(function() {
      module('ngCacheBuster');
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http'); 
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('with a views request', function() {
      it('should not add a cache buster', function() {
        var req = '/views/home.html';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

    describe('with a partials request', function() {
      it('should not add a cache buster', function() {
        var req = '/partials/home.html';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

    describe('with any other request', function() {
      it('should add a cache buster', function() {
        var req = '/task/1234';
        var regex_friendly_req = req.replace(/\//g, '\\/');
        var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+')
        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });
  });

  describe('configuring the provider with a whitelist', function() {
    beforeEach(function() {
      module('ngCacheBuster');
      module(function(httpRequestInterceptorCacheBusterProvider){
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*partials.*/,/.*template.*/]);
        httpRequestInterceptorCacheBusterProvider.setLogRequests(true);
      });
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
      
      //Whitelist, views
    describe('with a views request', function() {
      it('should add a cache buster', function() {
        var req = '/views/home.html';
        var regex_friendly_req = req.replace(/\//g, '\\/');
        var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+')

        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

      //Whitelist, partials
    describe('with a partials request', function() {
      it('should not add a cache buster', function() {
        var req = '/partials/home.html';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

      //Whitelist, template
    describe('with a partials request', function() {
      it('should not add a cache buster', function() {
        var req = '/template/home.html';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });


      //Whitelist, other
    describe('with any other request', function() {
      it('should add a cache buster', function() {
        var req = '/task/1234';
        var regex_friendly_req = req.replace(/\//g, '\\/');
        var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+')
        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });
  });

    //Blacklist
  describe('configuring the provider with a blacklist', function() {
    beforeEach(function() {
      module('ngCacheBuster');
      module(function(httpRequestInterceptorCacheBusterProvider){
        httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*users.*/,/.*orders.*/],true);
        httpRequestInterceptorCacheBusterProvider.setLogRequests(true);
      });
    });

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $http = $injector.get('$http');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

      //Blacklist, users
    describe('with an api/users request', function() {
      it('should add a cache buster', function() {
        var req = '/api/users/654645';
        var regex_friendly_req = req.replace(/\//g, '\\/');
        var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+')
        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

      //Blacklist, api/orders
    describe('with an api/orders request', function() {
      it('should add a cache buster', function() {
        var req = '/api/orders/654645';
        var regex_friendly_req = req.replace(/\//g, '\\/');
        var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+')
        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });

      //Blacklist, with existing query params
    describe('with an api/orders request with existing query-string parameter', function() {
      it('should add a cache buster, but not break existing params', function() {
        var req = '/api/orders/654645?orderid=115';
        var regex_friendly_req = req.replace(/\//g, '\\/').replace(/\?/g,'\\?')
        var expected = new RegExp(regex_friendly_req + '&cacheBuster=[0-9]+')
        $httpBackend.expectGET(expected).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });


      //Blacklist, partials
    describe('with a partials request', function() {
      it('should not add a cache buster', function() {
        var req = '/bower_components/mymodule/partials/home.html';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });
      
      //Blacklist, other
    describe('with any other request', function() {
      it('should not add a cache buster', function() {
        var req = '/task/1234';
        $httpBackend.expectGET(req).respond(200);
        $http.get(req);
        $httpBackend.flush();
      });
    });
      
      
  });
});
