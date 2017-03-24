/**
 * Created by vanchanagiri shravya on 1/25/2017.
 */

(function () {
    angular.module('postComment.home')
        .component('headerDirective', {

            bindings: {},
            templateUrl: 'partials/header.html',
            controller: headerController,
            controllerAs: 'h'
        });
    headerController.$inject = [];
    function headerController() {
        var vm = this;

    }
}());
