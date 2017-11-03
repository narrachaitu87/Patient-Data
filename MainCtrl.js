(function () {
    'use strict';
 
    angular.module('app').controller('MainCtrl', MainCtrl);
    
    MainCtrl.$inject = ['$scope','PatientServieService'];
    
    function MainCtrl($scope,PatientServieService) {
      $scope.DemographicDetails={};
      $scope.ConditionDetails={}; 
      
      this.$onInit = function () {
        $scope.PatientID='4596007';
      };
    
      this.$onDestroy = function () {
       
      };
      
      $scope.resetDetails=function() {
         $scope.Name='';
         $scope.Gender='';
         $scope.DOB='';
         $scope.gridOptions.data=[];
         $scope.PatientID='';
      }
      
      $scope.SearchPatient=function() {
        PatientServieService.getDemographicDetails($scope.PatientID)
                .then(function(res) {
                    $scope.DemographicDetails = res;
                    if($scope.DemographicDetails !== null) {
                      if($scope.DemographicDetails.name.length > 1)
                        $scope.Name = $scope.DemographicDetails.name[0].text;
                      $scope.Gender = $scope.DemographicDetails.gender;
                      $scope.DOB = $scope.DemographicDetails.birthDate;
                    }
                },
                function(data) {
                    console.log('Demographic Details retrieval failed.');
                });
          
        PatientServieService.getPatientConditionDetails($scope.PatientID)
                .then(function(res) {
                    $scope.ConditionDetails = res.entry;
                    $scope.gridOptions.data=res.entry;
                },
                function(data) {
                    console.log('Demographic Details retrieval failed.');
                });
      }
  
      $scope.gridOptions = {
            enableSorting: true, 
            columnDefs: [
              { name:'Condition Name', field: 'resource.code.text' },
              { name:'Date First Recorded', field: 'resource.dateRecorded' },
              { name:'Search in Pubmed', field: 'resource.code.text','cellTemplate':'celltemplate.html'}
            ],
            onRegisterApi: function(gridApi) {
                
            },
      };
    } 
})();