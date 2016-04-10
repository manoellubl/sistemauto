(function() {

    'use strict';

    /**
     * Controller responsável pela view das aulas.
     */
    angular.module('app').controller('ClazzController', [
        '$scope',
        '$mdDialog',
        'UserService',
        'StudentService',
        'ClazzService',
        '$filter',
        '$http',
        '$q',
        ClazzController
    ]);

    function ClazzController($scope, $mdDialog, UserService, StudentService, ClazzService, $filter, $http, $q) {
        StudentService.getStudents().then(function(info) {
            $scope.students = info.data;
            _.each(info.data, function(student) {
                console.log(student);
                ClazzService.query(student._id);
                ClazzService.post(student._id, {
                    data: new Date(),
                    user: UserService.getId(),
                    student: student._id,
                    type: 'Simulado',
                    ativo: false
                }).then(function(info) {
                    info.data.ativo = true;
                   ClazzService.put(student._id, info.data._id, info.data);
                }, function(error) {

                });
                ClazzService.all();
            });
        }, function(error) {

        });

        $scope.addClazz = function(student) {
            console.log('estudante selecionado');
            console.log(student);
            console.log(".....................");
        };


        $scope.dayFormat = "d";

        // To select a single date, make sure the ngModel is not an array.
        $scope.selectedDate = null;

        // If you want multi-date select, initialize it as an array.
        $scope.selectedDate = [];

        $scope.firstDayOfWeek = 0; // First day of the week, 0 for Sunday, 1 for Monday, etc.
        $scope.setDirection = function(direction) {
            $scope.direction = direction;
            $scope.dayFormat = direction === "vertical" ? "EEEE, MMMM d" : "d";
        };

        $scope.dayClick = function(date) {
            $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
        };

        $scope.prevMonth = function(data) {
            $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
        };

        $scope.nextMonth = function(data) {
            $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
        };

        $scope.tooltips = true;
        $scope.setDayContent = function(date) {

            // You would inject any HTML you wanted for
            // that particular date here.
            return "<p></p>";

            // You could also use an $http function directly.
            return $http.get("/some/external/api");

            // You could also use a promise.
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve("<p></p>");
            }, 1000);
            return deferred.promise;

        };
    }
})();
