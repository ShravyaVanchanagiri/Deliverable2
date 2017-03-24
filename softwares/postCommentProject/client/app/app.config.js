/**
 * Created by shravya on 23/3/17.
 */
(function () {
    angular.module("postComment")
        .config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
            console.log("from config");

            //$locationProvider.html5Mode(true);

            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'homeController',
                controllerAs: 'hc'
            }).state('eachPost',{
                url: '/home/:id',
                templateUrl : 'partials/eachPost.html',
                controller: 'eachPostController',
                controllerAs: 'epc',
                params: {
                    _id: null
                }
            })

            $urlRouterProvider.otherwise('/home');

        })
})();