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
      when('/patients/views/patientDetails.html', {
            templateUrl: 'patients/views/patientDetails.html',
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


patientControllers.controller('PatientListCtrl', ['$scope', '$http', '$routeParams', '$location', 'Patients', 
    function ($scope, $http, $routeParams, $location, Patients) {
        var index = 0;
        var list = Patients.query();
        
        //$http.get('patients/data/patientList.json').success(function (data) {
        //    $scope.patientList = data;
        //    list = data;
        //    console.log($scope.patientList);
        //    console.log(list);
        //});
        $scope.patientList = list;
        $scope.orderProp = 'ln';
        
        console.log(typeof $routeParams.patientId);
        //console.log(list);
        if (typeof $routeParams.patientId == 'undefined') {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id == $routeParams.patientId) {
                    $scope.patient = list[i];
                    index = i;
                    console.log(index);
                }
            }
        }
        
        
        $scope.save = function () {
            $scope.patientList.push($scope.patient);
            
            console.log($scope.patient);
        };
        
        $scope.cancel = function () {
            $scope.patient = null;
            // console.log($scope.patient);
            // console.log("cancel()");
            $location.path('/views/patientList.html');
        };

    }]);

patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', '$http', '$location',
    function ($scope, $routeParams, $http, $location) {
        var index = 0;
        $http.get('patients/data/patientList.json').success(function (data) {
            $scope.patientList = data;
            
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == $routeParams.patientId) {
                    $scope.patient = data[i];
                    index = i;
                    console.log(index);
                }
            }
        });
        
        
        
        $scope.update = function () {
            $scope.patientList[index] = $scope.patient;
            console.log(index + "-----------------");
            console.log($scope.patient);
        };
        
        $scope.cancel = function () {
            $scope.patient = null;
            // console.log($scope.patient);
            // console.log("cancel()");
            $location.path('/views/patientList.html');
        };
    }]);

// add patient controller
//patientControllers.controller('AddPatientCtrl', ['$scope', '$location',
//    function ($scope, $location) {
//        $scope.save = function () {
//            $scope.patientList.push($scope.patient);
            
//            console.log($scope.patient);
//        };
        
//        $scope.cancel = function () {
//            $scope.patient = null;
            
//            console.log($scope.patient);
//            console.log("cancel()");
//            $location.path('/views/patientList.html');
//        };
//    }]);

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

//patientControllers.controller('PatientListCtrl', ['$scope', 'Patients', 
//    function ($scope, Patients) {

//        $scope.patientList = Patients.query();
//        $scope.orderProp = 'ln';
//    }]);

//patientControllers.controller('PatientDetailCtrl', ['$scope', '$routeParams', 'Patients',
//    function ($scope, $routeParams, Patients) {


//        var list = [];
//list= Patients.query();
//        console.log(list[0].id);


//        for (var i = 0; i < list.length; i++) {
//            console.log(i);
//            if (list[i].id == $routeParams.patientId) {
//                console.log($routeParams.patientId);
//                $scope.patient = list[i];
//                console.log($scope.patient);
//            }
//        }




//        $scope.update = function (patient) {
//            console.log(patient);
//            // $http.post('public/patients/data/patientList.json', patient).success(function (data) { 
//            $scope.patientList.push(patient);
//            console.log(patient.id);
//           // });
//        };
//    }]);
