// This file is a router for User resource
// Version 0.0.1
// Author: Tero Hiltunen

var express = require("express");
var query = require('./queries');

var router = express.Router();

router.get('/:username',function(req,res){

    query.getFriendsByUsername(req,res);
});

// this router handles a request to uri
// localhost:3000/friends/login
router.post('/login',function(req,res){
    
    query.loginFriend(req,res);
});

// this router handles a request to uri
// localhost:3000/friends/register
router.post('/register',function(req,res){
    
    query.registerFriend(req,res);
});

module.exports = router;