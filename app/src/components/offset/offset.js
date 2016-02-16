/**
 *  Created by Akuma on 15/02/2016.
 */
angular.module('raspiJukeBox.filter', []).filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});