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
        $scope.updateView = function(){
            StudentService.getStudents().then(function (info) {
                $scope.students = info.data;
            }, function (error) {
                MensagemService.msg(error.data.message);
            });
        }
        $scope.updateView();


        $scope.sClazz = []
        $scope.userWasClicked = function(student){
            ClazzService.query(student._id).then(function (info) {
                $scope.sClazz = info.data;
                $scope.studentClick = student;
            }, function (error) {
                console.log(error);
            });
        };

        var date = new Date();        
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.myDate = date;
        $scope.minutesToEdit = 0;

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
            var s = start;
            var e = end;
            var m = new Date(start).getMonth();
            var events = [{
                title: 'Feed Me ' + m,
                start: s,
                end: s,
                allDay: false,
                className: ['customFeed']
            }];
            callback(events);
        };




        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.selectedClazz = date;
            $scope.data.date = new Date(date.start); /*variavel para guardar a data */
            $scope.data.time = new Date(date.start); /*variavel para guardar as horas */
            $scope.minutesToEdit = ($scope.selectedClazz.end - $scope.selectedClazz.start) / 60000;
            $scope.showDialog();
        };

        $scope.showDialog = function() {
            $mdDialog.show({
                scope: $scope,
                clickOutsideToClose: true,
                preserveScope: true, 
                templateUrl: '../view/newClazz.html',
                parent: angular.element(document.body)
            });
        };

         /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) { 
            element.attr({'tooltip': event.title, 'tooltip-append-to-body': true});
            $compile(element)($scope);
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
        $scope.data.date = new Date();
        $scope.today = new Date($scope.data.date.getFullYear(),
             $scope.data.date.getMonth(),
             $scope.data.date.getDate());


        $scope.salvarAula = function () {
            $scope.data.user = UserService.getId();
            var dataComeco = $scope.data.date;
            dataComeco.setHours($scope.data.time.getHours());
            dataComeco.setMinutes($scope.data.time.getMinutes());
            dataComeco = dataComeco.getTime();

            var dataFim = dataComeco + $scope.data.end*60000;

            $scope.data.start = dataComeco
            $scope.data.end = dataFim

            ClazzService.post($scope.data.student, $scope.data).then(function (info) {
                var aula = info.data;
                aula.start = new Date(aula.start);
                castDate(aula.start);

                aula.end = new Date(aula.end);
                castDate(aula.end);
                $scope.eventSources[0].push(aula);
                $scope.data = {};
            }, function (error) {
                console.log(error);
            });
        };

        $scope.editarAula = function(){
            var editedDate = $scope.data.date;
            editedDate.setHours($scope.data.time.getHours());
            editedDate.setMinutes($scope.data.time.getMinutes());

            $scope.selectedClazz.start = editedDate.getTime();
            $scope.selectedClazz.end = editedDate.getTime() + $scope.minutesToEdit*60000;
            var clazzCopy = {};
            clazzCopy._id = $scope.selectedClazz._id;
            clazzCopy.start = $scope.selectedClazz.start;
            clazzCopy.end = $scope.selectedClazz.end;
            clazzCopy.title = $scope.selectedClazz.title;
            clazzCopy.type = $scope.selectedClazz.type;
            clazzCopy.student = $scope.selectedClazz.student;
            clazzCopy.user = $scope.selectedClazz.user;
            clazzCopy.ativo = $scope.selectedClazz.ativo;

            console.log(clazzCopy);

            
            ClazzService.put($scope.data.student, clazzCopy._id, clazzCopy).then(function(info) {
                $scope.updateView();
                $scope.updateCalendar();
                $scope.closeDialog();
                console.log("SUCESSO UPDATE AULA");
            }, function(error) {
                console.log("ERRO UPDATE AULA");
                if(error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
            });
        };

        $scope.removeClazz = function(id) {
            ClazzService.remove($scope.selectedClazz.student, id).then(function(info) {
                $scope.updateView();
                $scope.updateCalendar();
                $scope.closeDialog();
                console.log("SUCESSO");
            }, function(error) {
                console.log("ERRO");
                if(error.data.message != undefined) {
                    MensagemService.msg(error.data.message);
                }
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
                editable: false,
                ignoreTimezone: false,
                header: {
                    left: 'title month agendaWeek agendaDay',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventRender: $scope.eventRender
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



        $scope.closeDialog = function() {
            $mdDialog.hide();
            $scope.selectedClazz = {};
        };


        $scope.updateCalendar = function() {
            ClazzService.all().then(function (info) {
                $scope.eventSources.splice(0, $scope.eventSources.length);
                _.each(info.data, function(data) {
                    data.start = new Date(data.start);
                    castDate(data.start);

                    data.end = new Date(data.end);
                    castDate(data.end);
                });
                $scope.eventSources.push(info.data);

                $scope.eventSources.push($scope.eventSource);
            });
        };
        $scope.updateCalendar();

        function castDate(data) {
            data.setUTCFullYear( data.getFullYear(), data.getMonth(), data.getDate() );
        }
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];

    }
})();
