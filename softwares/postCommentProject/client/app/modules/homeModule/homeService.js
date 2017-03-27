/**
 * Created by shravya on 23/3/17.
 */
(function () {
    angular.module('postComment.home')
        .service("homeService", homeService);


    homeService.$inject = ['$http', 'api', '$q', '$rootScope'];

    function homeService($http, api, $q, $rootScope) {
        var homeService = {
            getAllPosts: getAllPosts,
            getSelectedPost: getSelectedPost,
            addComment: addComment,
            addLike: addLike,
            removeLike: removeLike,
            findCount: findCount
        };
        return homeService;

        function getAllPosts(query) {
            console.log(query)
            return api.getAllPosts({q:query}).$promise;
        }

        function getSelectedPost(id) {
            return api.getSelectedPost({id: id}).$promise;
        }

        function addComment(query) {
            return api.addComment({q: query}).$promise;
        }

        function addLike(query) {
            return api.addLike({q: query}).$promise;
        }

        function removeLike(query) {
            return api.removeLike({q: query}).$promise;
        }

        function findCount(query) {
            return api.likeCount({q: query}).$promise;
        }
    }
})();
