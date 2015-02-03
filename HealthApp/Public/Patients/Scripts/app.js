'use strict';



var healthApp = angular.module('healthApp', [
    'ngRoute',
    'patientControllers',
    'patientServices'
]);

healthApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
      when('/patients', {
            templateUrl: 'patients/views/patientList.html',
            controller: 'PatientListCtrl'
        }).
      when('/patients/views/:patientId', {
            templateUrl: 'patients/views/patientDetails.html',
            controller: 'PatientDetailCtrl'
        }).
      otherwise({
            redirectTo: '/patients'
        });
    }]);


var patientControllers = angular.module('patientControllers', []);


//patientControllers.controller('PatientListCtrl', ['$scope', '$http', 
//    function ($scope, $http) {
//        $http.get('patients/data/patientList.json').success(function (data) {
//            $scope.patientList = data;

//        });
//        $scope.orderProp = 'ln';
//    }]);

patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('patients/data/patientList.json').success(function (data) {
            $scope.patientList = data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == $routeParams.patientId) {
                    $scope.patient = data[i];
                }
            }
        });
        
        $scope.update = function (patient) {
            console.log(patient);
            $http.post('public/patients/data/patientList.json', patient).success(function (data) {
                data.push(patient);
                console.log(patient.id);
            });
        };
    }]);

var patientServices = angular.module('patientServices', ['ngResource']);

patientServices.factory('Patients', ['$resource',
  function ($resource) {
        return $resource('patients/data/patientList.json/:id', { id: '@id' }, {
            'get': { method: 'GET', params: { id: '@id' } },
            'query': { method: 'GET', isArray: true },
            'update': { method: 'PUT' },            
            'save': { method: 'POST' },            
            'delete': { method: 'DELETE' }
        });
    }]);

patientControllers.controller('PatientListCtrl', ['$scope', 'Patients', 
    function ($scope, Patients) {
        
        $scope.patientList = Patients.query();
        $scope.orderProp = 'ln';
    }]);

//patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', 'Patients',
//    function ($scope, $routeParams, Patients) {
        
        
        
        
        
//        $scope.patient = Patients.get({id:$routeParams.patientId });
              
            


//        $scope.update = function (patient) {
//            console.log(patient);
//            // $http.post('public/patients/data/patientList.json', patient).success(function (data) { 
//            $scope.patientList.push(patient);
//            console.log(patient.id);
//           // });
//        };
//    }]);
