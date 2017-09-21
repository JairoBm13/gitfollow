var express = require('express');
var GitHubApi = require('github');
var router = express.Router();

var github = new GitHubApi({});

/* GET home page. */
router.get('/', function(req, res, next) {
  
});

router.get('/search/:user', searchUser);

router.get('/:user/followings', getFollowing);

//Functions for GET

function searchUser(req, res){
  
}

function getFollowing(req, res, next){
  github.users.getFollowingForUser({
    username: req.params.user
  }, function(err, response) {
    res.json(JSON.stringify(response));
  });
}




module.exports = router;
