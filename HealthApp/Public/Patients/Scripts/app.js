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
      when('/patients/views/newPatient.html', {
            templateUrl: 'patients/views/newPatient.html',
            controller: 'AddPatientCtrl'
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

//Patient List Controller
patientControllers.controller('PatientListCtrl', ['$scope', '$http', '$routeParams', '$location', 'Patients', 
    function ($scope, $http, $routeParams, $location, Patients) {

        $scope.patientList = Patients.query();
        $scope.orderProp = 'ln';
        
    }]);

//Patient Detail Controller
patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        
        $scope.nameRegex = /^[A-Z][a-zA-Z]\d/;
        $scope.phoneRegex = /^\(?([0 - 9]{ 3})\)?[-. ]?([0-9]{ 3})[-. ]?([0-9]{ 4})$/;
        

        var index = 0;
        $http.get('patients/data/patientList.json').success(function (data) {
            $scope.patientList = data;
            
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == $routeParams.patientId) {
                    $scope.patient = data[i];
        $scope.patient.lastVisitDate = new Date(Date.parse(data[i].lastVisitDate));
                    index = i;
                    console.log(index);
                }
            }
        });
        $scope.update = function () {
            //$scope.patientList.save( $scope.patient);
            console.log($scope.patient);
        
        };
        

        
        $scope.cancel = function () {
            $scope.patient = null;
            // console.log($scope.patient);
            // console.log("cancel()");
            $location.path('/views/patientList.html');
        };
    }]);

//Add new patient controller
patientControllers.controller('AddPatientCtrl', ['$scope', '$location', 'Patients', 
    function ($scope, $location,Patients) {
        
        $scope.nameRegex = /^[A-Z][a-zA-Z]\d/;
        $scope.phoneRegex = /^\(?([0 - 9]{ 3})\)?[-. ]?([0-9]{ 3})[-. ]?([0-9]{ 4})$/;
        
        var list = Patients.query();
        
        $scope.add = function () {
           list.push($scope.patient);
            
            console.log(list);
          //  list.save();
        };
        
        $scope.cancel = function () {
            $scope.patient = null;
            
            console.log($scope.patient);
            console.log("cancel()");
            $location.path('/views/patientList.html');
        };
    }]);

var patientServices = angular.module('patientServices', ['ngResource']);

patientServices.factory('Patients', ['$resource',
  function ($resource) {
        //return $resource('patients/data/patientList.json/:id', { id: '@id' }, {
        //    'get': { method: 'GET', params: { id: '@id' } },
        //    'query': { method: 'GET', isArray: true },
        //    'update': { method: 'PUT' },            
        //    'save': { method: 'POST' },            
        //    'delete': { method: 'DELETE' }
        //});
        return $resource('patients/data/patientList.json', null, {
            'get': { method: 'GET', params: { id: '@id' } },
            query: { method: 'GET', isArray: true },
            'update': { method: 'PUT' },            
            'save': { method: 'POST' },            
            'delete': { method: 'DELETE' }
        });
    }]);

