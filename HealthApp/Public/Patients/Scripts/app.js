'use strict';

var healthApp = angular.module('healthApp', []);

healthApp.controller('PatientListCtrl', ['$scope', '$http', 
    function ($scope, $http) {        
        $http.get('patients/data/patientList.json').success(function (data) {
            $scope.patientList = data;
            $scope.orderProp = 'ln';
        });
        
    }]);



