'use strict';

describe('Service: settings', function () {

  // load the service's module
  beforeEach(module('ordioApp', ['ngRoute']));

  // instantiate service
  var settings;
  beforeEach(inject(function (_settings_) {
    settings = _settings_;
  }));

  it('should have base_uri in settings', function () {
    expect(true).toBe(true);
  });

});
