(function () {
    'use strict';
var app = angular.module('app', ['ngTouch', 'ui.grid']);
    app.constant('config', {  
      apiUrl: 'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca'
    });
})();