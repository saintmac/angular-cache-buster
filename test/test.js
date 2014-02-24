describe('ngCacheBuster', function () {
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
      var req = '/view';
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
