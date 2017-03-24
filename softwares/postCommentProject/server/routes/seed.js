/**
 * Created by shravya on 23/3/17.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var PostModel = require('../models/postModel');
var LikeModel = require('../models/likeModel');
var CommentModel = require('../models/commentModel');
var q = require('q');
// Connect to the db
mongoose.connect('mongodb://127.0.0.1:27017/postModel', function (error) {
    if (!error) {
        console.log("connection established...!");
    }
});

fs.readFile('/home/shravya/WebstormProjects/Deliverable 2/softwares/postCommentProject/server/routes/postsData.json', 'utf8', function (err, data) {

    if (err) {
        return console.log(err);
    }
    if (data) {
        var posts = JSON.parse(data);
        console.log(posts.length);
        for (var i = 0; i < posts.length; i++) {
            addPost(posts[i]);
        }

        function addPost(post) {
            var eachPost = [];
            eachPost.text = post.text;
            eachPost.postedBy = post.postedBy;
            eachPost.postedOn = new Date(post.postedOn);
            eachPost.comments = [];
            eachPost.likes = [];
            var promises = [];


            post.comments.forEach(function (eachComment) {
                promises.push(addComments(eachPost, eachComment));
            })

            post.likes.forEach(function (eachLike) {
                promises.push(addLikes(eachPost, eachLike));
            })
            q.allSettled(promises).then(function (res) {
                var allposts = PostModel(eachPost);
                allposts.save(function (err) {
                    if (err) {
                        console.log("error in product storing", err);
                    } else {
                        console.log("data stored in db successfully");
                    }
                })
            });
        }

        function addComments(eachPost, eachComment) {
            var newComment = {};
            var deffered = q.defer();
            newComment.commentedBy = eachComment.commentedBy;
            newComment.text = eachComment.text;
            newComment.commentedOn = new Date(eachComment.commentedOn);
            var comment = CommentModel(newComment);
            comment.save(function (err) {
                if (err) {
                    deffered.reject("Error occured while storing comments");
                }
                else {
                    eachPost.comments.push(comment._id);
                    deffered.resolve();
                }
            });
            return deffered.promise;
        }

        function addLikes(eachPost, eachLike) {
            var newLike = {};
            var deffered = q.defer();
            newLike.likedOn = new Date(eachLike.likedOn);
            newLike.likedBy = eachLike.likedBy;
            var like = LikeModel(newLike);
            like.save(function (err) {
                if (err) {
                    deffered.reject("Error occured while storing likes");
                } else {
                    eachPost.likes.push(like._id);
                    deffered.resolve();
                }
            })
            return deffered.promise;
        }
    }
});





