/**
 * Created by shravya on 23/3/17.
 */
var prepareRes = require("../apiUtils/prepareRes");
var errorRes = require("../apiUtils/errorRes");
var PostModel = require("../models/postModel");
var CommentModel = require("../models/commentModel");
var LikeModel = require("../models/likeModel");
var postRouter = {
    getAllPosts: function (req, res) {
        var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        PostModel.find({}).sort(query.sortingCriteria).skip(query.numberToSkip).limit(query.limit).exec(function (err, posts) {
            if (err) {
                console.log(err);
                res.send(errorRes(500, "Failed"));
            } else {
                console.log(posts)
                res.send(prepareRes(200, posts, "OK"));
            }
        });
    },
    getSelectedPost: function(req,res){
        try{
            PostModel.findOne({_id:req.params.id}).populate('comments').populate('likes').exec(function(err,post){
                if(err){
                    res.send(errorRes(500,"Failed"));
                }else{
                    res.send(prepareRes(200,post,"OK"));
                }
            });
        }catch(error){
            console.log("error",error);
        }
    },
    addComment: function (req, res) {
        var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var postId = query.id;
        try {
            var newComment = new CommentModel({
                "text": query.text,
                "commentedBy": query.commentedBy,
                "commentedOn": query.commentedOn
            });
            newComment.save(function (err) {
                if (err) {
                    res.send(errorRes(500,"Failed"));
                }
                else {
                    PostModel.findOne({_id: postId}).exec(function (err1, response) {
                        if (err1) {
                            res.send(errorRes(500,"Failed"));
                        } else {
                            if (response) {
                                response.comments.push(newComment._id);
                                response.save(function (err2) {
                                    if (err2) {
                                        res.send(errorRes(500,"Failed"));
                                    } else {
                                       res.send(200,response,"OK");
                                    }
                                })
                            }
                        }
                    });
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    },
    addLike: function(req,res){
        var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var postId = query.id;
        try{
            var newLike = new LikeModel({
                "likedBy": query.likedBy,
                "likedOn": query.likedOn
            });
            newLike.save(function (err) {
                if (err) {
                    res.send(errorRes(500,"Failed"));
                }
                else {
                    PostModel.findOne({_id: postId}).exec(function (err1, response) {
                        if (err1) {
                            console.log(err1);
                        } else {
                            if (response) {
                                response.likes.push(newLike._id);
                                response.save(function (err2) {
                                    if (err2) {
                                        res.send(errorRes(500,"Failed"));
                                    } else {
                                        var data = {
                                            "likeId" : newLike._id
                                        }
                                        res.send(prepareRes(200,data,"OK"));
                                    }
                                })
                            }
                        }
                    });
                }
            })
        }catch(error){
            console.log(error);
        }
    },
    removeLike: function(req,res){
        var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var postId = query.postId;
        var likeId = query.likeId;
        PostModel.findOne({_id: postId}).exec(function (err1, response) {
            if (err1) {
                console.log(err1);
            } else {
                if (response) {
                    console.log(response);
                    response.likes.remove(likeId);
                    response.save(function(err2, data){
                        console.log("IN REMOVE FROM POST");
                        console.log(data);
                        if(err2){
                            res.send(errorRes(500,"Failed"));
                        }else {
                            LikeModel.remove({_id : likeId}).exec(function(err1){
                                if(err1) {
                                    res.send(err1)
                                }else {
                                    res.send(new prepareRes(200,"","ok"));
                                }
                            });

                        }

                    });

                }
            }
        });
    },
    likeCount : function(req,count1){
        var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
        var postId = query.postId;
        PostModel.findOne({_id: postId}).exec(function (err1, response) {
            if (err1) {
                console.log(err1);
            } else {
                if (response) {
                   console.log(response);
                    var count = response.likes.length;
                    count1.send(prepareRes(200,count,"OK"));
                }
            }
        });

    }
};
module.exports = postRouter;
