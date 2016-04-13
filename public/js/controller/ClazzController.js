(function () {

    'use strict';

    /**
     * Controller responsável pela view das aulas.
     */
    angular.module('app').controller('ClazzController', [
        'StudentService', 'ClazzService', 'UserService',
        '$scope', '$compile', 'uiCalendarConfig', '$mdDialog', 'MensagemService',
        ClazzController
    ]);

    function ClazzController(StudentService, ClazzService, UserService, $scope, $compile, uiCalendarConfig, $mdDialog, MensagemService) {
        StudentService.getStudents().then(function (info) {
            $scope.students = info.data;
        }, function (error) {
            MensagemService.msg(error.data.message);
        });

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
        };

        $scope.events = [
            {title: 'All Day Event', start: new Date(y, m, 1)},
            {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2)},
            {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false},
            {
                id: 999, title: 'Repeating Eve' +
            'nt', start: new Date(y, m, d + 4, 16, 0), allDay: false
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false
            },
            {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/'}
        ];

        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{
                title: 'Feed Me ' + m,
                start: s + (50000),
                end: s + (100000),
                allDay: false,
                className: ['customFeed']
            }];
            callback(events);
        };

        $scope.tipos = [{
            value: 'Simulador'
        }, {
            value: 'Teórica'
        }, {
            value: 'Prática'
        }
        ];

        $scope.data = {};

        $scope.salvarAula = function () {
            $scope.data.user = UserService.getId();

            ClazzService.post($scope.data.student, $scope.data).then(function (info) {
                $scope.eventSources[0].push(info.data);
                $scope.data = {};
            }, function (error) {
                console.log(error);
            });
        };

        $scope.cancelar = function () {
            $scope.data = {};
        };

        $scope.showForm = function (student) {
            $scope.data.title = student.name;
            $scope.data.student = student._id;
        };

        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                }
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };

        ClazzService.all().then(function (info) {
            $scope.eventSources.splice(0, $scope.eventSources.length);
            $scope.eventSources.push(info.data);
            $scope.eventSources.push($scope.eventSource);
            $scope.eventSources.push($scope.eventsF);
        });
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

    }
})();
