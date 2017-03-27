/**
 * Created by shravya on 24/3/17.
 */
(function () {
    angular.module('postComment.home')
        .controller("eachPostController", eachPostController);

    eachPostController.$inject = ['$http', 'homeService', '$rootScope', '$state', '$stateParams'];

    function eachPostController($http, homeService, $rootScope, $state, $stateParams) {
        var vm = this;
        vm.selectedPost = [];
        vm.lessCom = true;
        vm.boxShow = false;
        vm.isLiked = false;
        console.log($stateParams.id);
        vm.getPost = getPost;
        vm.paginationLimit = paginationLimit;
        vm.hasMoreItemsToShow = hasMoreItemsToShow;
        vm.showMoreItems = showMoreItems;
        vm.showLessItems = showLessItems;
        vm.addComment = addComment;
        vm.sendLike = sendLike;
        vm.likeCount = likeCount;
        getPost();

        function getPost() {
            homeService.getSelectedPost($stateParams.id).then(success).catch(failure);

            function success(response) {
                vm.selectedPost = response.data;
                console.log(vm.selectedPost);
                console.log(vm.selectedPost.comments.length);
                vm.pagesShown = 1;
                vm.pageSize1 = 3;
                vm.likesForPost = vm.selectedPost.likes.length;
            }

            function failure(failure) {

            }
        }

        function hasMoreItemsToShow() {
            return vm.pagesShown < (vm.selectedPost.comments.length / vm.pageSize1);
        }

        function showMoreItems() {
            vm.pagesShown = vm.pagesShown + 1;
            vm.lessCom = false;
        }

        function paginationLimit(data) {
            return vm.pageSize1 * vm.pagesShown;
        };
        function showLessItems() {
            vm.pagesShown = vm.pagesShown - 1;
            vm.lessCom = true;
        }

        function addComment() {
            console.log("cpming here");
            var curDat = Date.now();

            var query = {
                "id": $stateParams.id,
                "text": vm.newComment,
                "commentedBy": "x",
                "commentedOn": curDat
            };
            console.log(query);
            homeService.addComment(query).then(success).catch(failure);
            function success(response) {
                console.log(response.data);
            }

            function failure(failure) {

            }
        }

        function sendLike() {

            var curDat = Date.now();

            var query = {
                "id": $stateParams.id,
                "likedBy": "shravya",
                "likedOn": curDat
            };
            if (vm.isLiked == false) {
                vm.isLiked = true;
                vm.count += 1;
                homeService.addLike(query).then(success).catch(failure);
                function success(response) {
                    console.log("success");
                    console.log(response.data.likeId);
                    vm.likeId = response.data.likeId;
                    likeCount($stateParams.id);
                }

                function failure(failure) {

                }
            } else {
                console.log("in remove");
                vm.isLiked = false;
                vm.count -= 1;
                var query1 = {
                    "postId": $stateParams.id,
                    "likeId": vm.likeId
                }
                homeService.removeLike(query1).then(success).catch(failure);
                function success(response) {
                    console.log("query removed");
                    likeCount($stateParams.id);
                }

                function failure(failure) {
                    console.log(failure);
                }

            }
        }

        function likeCount(postId) {
            console.log("in likecount function");
            vm.likesForPost = 0;
            var query = {
                "postId": postId
            }
            homeService.findCount(query).then(success).catch(failure);
            function success(response) {
                vm.likesForPost = response.data;
            }

            function failure(failure) {
                console.log(failure);
            }
        }
    }
})();
