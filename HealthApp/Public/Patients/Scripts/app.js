var healthApp = angular.module('healthApp', []);

healthApp.controller('PatientListCtrl', function ($scope) {
    $http.get('Public/Patients/Data/Patient.json').success(function (data) {
        $scope.patientList = data;
    });
    
   // $scope.orderProp = 'age';
});

