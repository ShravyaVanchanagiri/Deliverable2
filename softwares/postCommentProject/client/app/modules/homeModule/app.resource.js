/**
 * Created by shravya on 3/3/17.
 */
//TODO: fix comment: Files structure is not correct. Please refer the SBPO project structure
//Need to move all app.*.js files to modules/buyProduct/ folder
(function () {
    'use strict';

    angular.module('postComment.home')
        .factory('api', api);

    api.$inject = ['$resource', '$rootScope'];

    function api($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }

    var getParamDefaults = function () {
        return {
            id: '@id'
        };
    };

    var getActions = function () {
        return {
            'getAllPosts': {
                method: 'GET',
                url: '/getAllPosts'
            },
            'getSelectedPost' : {
                method: 'GET',
                url: '/getSelectedPost/:id'
            },
            'addComment' : {
                method : 'POST',
                url: '/addComment'
            },
            'addLike' : {
                method : 'POST',
                url: '/addLike'
            },
            'removeLike' : {
                method : 'DELETE',
                url: '/removeLike'
            }
        }
    }
}());