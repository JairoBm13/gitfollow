var express = require('express');
var GitHubApi = require('github');
var router = express.Router();
var mongodb = require('mongodb');

var urlMongo = "mongodb://adminparcial:admin@ds040027.mlab.com:40027/git-follow";

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
  mongodb.connect(urlMongo, (err,db) => {
    if(err) throw err;
    var userComments = db.collection("userComments");
    userComments.find({id:userid}).toArray((err2, comments) => {
      callback(comments);
      db.close();
    });
  });
}

function getCommentsForRepo(repoid, callback){
  mongodb.connect(urlMongo, (err,db) => {
    if(err) throw err;
    var repoComments = db.collection("repoComments");
    repoComments.find({id:repoid}).toArray((err2, comments) => {
      callback(comments);
      db.close();
    });
  });
}

router.get('/repoComments/:id', function(req, res, next) {
  getCommentsForRepo(req.params.id, (tweets) => {
    res.json(tweets);
  });
});

router.get('/userComments/:id', function(req, res, next) {
  getCommentsForUser(req.params.id, (tweets) => {
    res.json(tweets);
  });
});

router.post('/commentUser/:id', function(req, res){
  console.log(req.params);
  var comment = req.body;
  mongodb.connect(urlMongo, (err, db) => {
    db.collection("userComments")
    .updateOne({id:req.params.id}, 
      {$push: {comments: comment.value}}, (dbError, dbRes) =>{
        db.close();
      });
  });
})

router.post('/commentRepo/:id', function(req, res){
  var comment = req.body;
  mongodb.connect(urlMongo, (err, db) => {
    db.collection("repoComments")
    .updateOne({id:req.params.id}, 
      {$push: {comments: comment.value}}, (dbError, dbRes) =>{
        db.close();
      });
  });
})

module.exports = router;
