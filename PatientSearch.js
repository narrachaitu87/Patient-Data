(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('PatientServieService', PatientServieService);
 
    PatientServieService.$inject = ['$http','$q','config'];
    
    function PatientServieService($http,$q,config) {
        var service = {};
        service.getDemographicDetails = getDemographicDetails;
        service.getPatientConditionDetails = getPatientConditionDetails;
        return service;
        
        //Getting patient demographic data
        function getDemographicDetails(PatientId) {
            var def = $q.defer();
            $http({
                     method: 'GET',
                     url: config.apiUrl + '/Patient/'+ PatientId,
                     headers: {'Accept': 'application/json+fhir'}
                 })
                 .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get Demographic Details");
                });
            return def.promise;
        }
        
        //Getting Patient condition 
        function getPatientConditionDetails(PatientId) {
            var def = $q.defer();
            $http({
                     method: 'GET',
                     url: config.apiUrl + '/Condition?patient='+PatientId+'&status=active',
                     headers: {'Accept': 'application/json+fhir'}
                 })
                 .success(function(data) {
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get patient condition Details");
                });
            return def.promise;
        }
    }
 
})();