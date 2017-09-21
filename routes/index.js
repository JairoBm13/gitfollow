var express = require('express');
var GitHubApi = require('github');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  
});

router.get('/search/:user', searchUser);

router.get('/followers/:user', getFollowing);

//Functions for GET

function searchUser(req, res){
  
}

function getFollowing(req, res){
  var github = new GitHubApi({});
  console.log(req.params.user);
  github.users.getFollowingForUser({
    username: req.params.user
  }, function(err, response) {
    res.json(JSON.stringify(response));
    console.log(response);
  });
}




module.exports = router;
