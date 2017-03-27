/**
 * Created by shravya on 23/3/17.
 */
/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(function () {
    angular.module('postComment.home')
        .controller("homeController", homeController);

    homeController.$inject = ['$http', 'homeService', '$rootScope', '$state', 'NgTableParams', '$filter'];

    function homeController($http, homeService, $rootScope, $state, NgTableParams, $filter) {
        var vm = this;
        vm.allPosts = [];
        vm.loadTable = loadTable;
        loadTable();
        function loadTable() {
            vm.tableParams = new NgTableParams({
                page: 1,
                count: 5
            }, {
                getData: function (params) {
                    var quer = {};
                    quer.limit = params.count();
                    quer.numberToSkip = (params.page() - 1) * params.count();
                    quer.sortingCriteria = params.sorting();
                    return homeService.getAllPosts(quer).then(
                        function (response) {
                            console.log(response)
                            vm.allPosts = response.data;
                            var filterObj = params.filter(), filteredData = $filter('filter')(vm.allPosts, filterObj);
                            var postsData = $filter('orderBy')(filteredData, params.orderBy());
                            vm.data = postsData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            params.total(vm.allPosts);
                            return vm.data;
                        },
                        function (failure) {
                            console.log(failure);
                        });
                }
            });
        }
    }
})();

