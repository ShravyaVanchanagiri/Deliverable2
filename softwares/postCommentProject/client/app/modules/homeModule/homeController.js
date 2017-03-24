/**
 * Created by shravya on 23/3/17.
 */
/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(function () {
    angular.module('postComment.home')
        .controller("homeController", homeController);

    homeController.$inject = ['$http', 'homeService', '$rootScope', '$state', 'NgTableParams','$filter'];

    function homeController($http, homeService, $rootScope, $state, NgTableParams,$filter) {
        var vm = this;
        vm.allPosts = [];
        vm.getAllPosts = getAllPosts;
        getAllPosts();
        function getAllPosts() {
            homeService.getAllPosts().then(success).catch(failure);
            function success(response) {
                //console.log(response.data);
                vm.allPosts = response.data;
                loadTable();
            }

            function failure(failure) {

            }
        }
        function loadTable() {
            vm.tableParams = new NgTableParams({
                page: 1,
                count: 10
            }, {
                getData: function (params) {
                    var filterObj = params.filter(), filteredData = $filter('filter')(vm.allPosts, filterObj);

                    var postsData = $filter('orderBy')(filteredData, params.orderBy());;
                    vm.data = postsData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(vm.allPosts.length);
                    return vm.data;
                }
            });
        }

    }
})();

