var express = require('express');
var GitHubApi = require('github');
var router = express.Router();
var mongodb = require('mongodb');

var urlMongo = "mongodb://localhost:27017/gitfollow";

router.get('/getRepos/:user', function(req, res){
  var github = new GitHubApi({});
  github.repos.getForUser({
    username: req.params.user,
    sort : "updated",
    page : 1,
    per_page : 5
  }, function(err, response) {
    res.json(response);
  });
});

router.get('/followers/:user', function (req, res){
  var github = new GitHubApi({});
  github.users.getFollowingForUser({
    username: req.params.user
  }, function(err, response) {
    res.json(response);
  });
}
);

router.get('/getUser/:user', function(req, res){
  var github = new GitHubApi({});
  github.users.getForUser({
    username: req.params.user
  }, function(err, response) {
    res.json(response);
  });
})

router.get('/followersFrom/:user', function(req,res){
  var github = new GitHubApi({});
  github.users.getFollowersForUser({
    username: req.params.user
  }, function(err, response) {
    res.json(response);
  });
})

//Functions for GET

function getCommentsForUser(userid , callback){
  mongodb.connect(url, (err,db) => {
    var userComments = db.collection("userComments");
    userComments.find({id:userid}).toArray((err2, comments) => {
      callback(comments);
    });
  });
}

function getCommentsForRepo(repoid, callback){
  mongodb.connect(url, (err,db) => {
    var repoComments = db.collection("repoComments");
    repoComments.find({id:repoid}).toArray((err2, comments) => {
      callback(comments);
    });
  });
}

router.get('/repoCommnets/:id', function(req, res, next) {
  getCommentsForRepo(req.params.id, (tweets) => {
    res.json(tweets);
  });
});

router.get('/userCommnets/:id', function(req, res, next) {
  getCommentsForUser(req.params.id, (tweets) => {
    res.json(tweets);
  });
});

router.post('/commentUser/:id', function(req, res){
  var comment = req.body;
  mongodb.connect(url, (err, db) => {
    db.collection("userComments")
    .updateOne({id:req.params.id}, 
      {$push: {comments: comment}}, (dbError, dbRes) =>{
        db.close();
      });
  });
})

router.post('/commentRepo/:id', function(req, res){
  var comment = req.body;
  mongodb.connect(url, (err, db) => {
    db.collection("repoComments")
    .updateOne({id:req.params.id}, 
      {$push: {comments: comment}}, (dbError, dbRes) =>{
        db.close();
      });
  });
})

module.exports = router;
