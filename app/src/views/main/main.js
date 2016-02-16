/**
 *  Created by Akuma on 09/02/2016.
 */
angular.module('raspiJukeBox.main', ['raspiJukeBox.api', 'raspiJukeBox.filter'])
    .config(function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'src/views/main/main.html',
            controller: 'MainCtrl'

        });
    })
    .controller('MainCtrl', function ($scope, Jukebox) {
        'use strict';
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;
        $scope.songs = [];
        Jukebox.list().query().$promise.then(function (songs) {
            angular.forEach(songs, function (value) {
                var song = {
                    id: value.id,
                    artist: value.artist,
                    title: value.title
                };
                this.push(song);
            }, $scope.songs);
        });
        $scope.play = function (id) {
            Jukebox.play().get({id: id}).$promise.then(function (results) {
                var text = "";
                angular.forEach(results, function (value) {
                    if (typeof value === 'string') {
                        text += value;
                    }
                });
                Materialize.toast(text, 2000, 'rounded');
            });
        };
        $scope.stop = function () {
            Jukebox.stop().get().$promise.then(function (results) {
                var text = "";
                angular.forEach(results, function (value) {
                    if (typeof value === 'string') {
                        text += value;
                    }
                });
                Materialize.toast(text, 2000, 'rounded');
            });
        };
        $scope.playAll = function () {
            Jukebox.playAll().get().$promise.then(function (results) {
                var text = "";
                angular.forEach(results, function (value) {
                    if (typeof value === 'string') {
                        if (value === '\n') {
                            value = '<br/>';
                        }
                        text += value;
                    }
                });
                Materialize.toast(text, 4000, 'rounded');
            });
        };

        $scope.range = function () {
            var rangeSize = Math.min(5, $scope.pageCount() + 1);
            var ret = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }
            if (start < 0) {
                start = 0;
            }

            for (var i = start; i < start + rangeSize; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function () {
            return $scope.currentPage === 0 ? "disabled" : "waves-effect";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.songs.length / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "waves-effect";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };
    });