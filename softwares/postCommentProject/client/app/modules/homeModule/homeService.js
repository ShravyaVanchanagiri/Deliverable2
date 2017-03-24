/**
 * Created by shravya on 23/3/17.
 */
/**
 * Created by vanchanagiri shravya on 1/18/2017.
 */
(function () {
    angular.module('postComment.home')
        .service("homeService", homeService);


    homeService.$inject = ['$http', 'api', '$q', '$rootScope'];

    function homeService($http, api, $q, $rootScope) {
        var homeService = {
            getAllPosts : getAllPosts,
            getSelectedPost : getSelectedPost,
            addComment : addComment,
            addLike : addLike,
            removeLike : removeLike
        };
        return homeService;

        function getAllPosts() {
            return api.getAllPosts().$promise;
        }

        function getSelectedPost(id){
            return api.getSelectedPost({id:id}).$promise;
        }

        function addComment(query){
            return api.addComment({q:query}).$promise;
        }
        function addLike(query){
            console.log("in home service");
            return api.addLike({q:query}).$promise;
        }
        function removeLike(query){
            return api.removeLike({q:query}).$promise;
        }
    }
})();
