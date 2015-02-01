'use strict';

var healthApp = angular.module('healthApp', []);

healthApp.controller('PatientListCtrl', ['$scope', '$http', 
    function ($scope, $http) {        
        $http.get('patients/data/patientList.json').success(function (data) {
            $scope.patientList = data;
        });   
    }]);

//phonecatApp.controller('PhoneListCtrl', ['$scope', '$http',
//  function ($scope, $http) {
//        $http.get('phones/phones.json').success(function (data) {
//            $scope.phones = data;
//        });
        
//        $scope.orderProp = 'age';
//    }]);
//healthApp.controller('PatientListCtrl', function ($scope) {
//    $scope.patientList = [
//        {
//            'id': 'Nexus S',
//            'fn': 'Fast just got faster with Nexus S.'
//        },
//        {
//            'id': 'Motorola XOOM™ with Wi-Fi',
//            'fn': 'The Next, Next Generation tablet.'
//        },
//        {
//            'id': 'MOTOROLA XOOM™',
//            'fn': 'The Next, Next Generation tablet.'
//        }
//    ];
//});

