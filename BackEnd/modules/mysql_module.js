var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var server = require('../index'); //index.js

// define connection attributes for mysql server
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'friends_schema'
});

//connect to mysql server with given connection attributes
connection.connect(function(err){
   
    if(err){
        console.log("could not connect to mysql server:" + err.message);
    }else{
        console.log("connected to mysql server");
    }
});

// call this function to check username and password from mysql database
exports.loginMysql = function(req,res){

    connection.query('select * from user where username=? and pass=?',                                                                [req.body.username,req.body.password],function(error,results,fields){
    
        console.log(error);
        console.log(results);
        console.log(fields);
    });
};

exports.loginMysqlProc = function(req,res){

    connection.query('call getLoginInfo(?,?)',                                                                [req.body.username,req.body.password],function(error,results,fields){
    
        if(error)
        {
            res.send(502,{status:error.message});
        }
        else
        {
            var test = results[0];
            if(test.length > 0)
            {                
                req.session.kayttaja = test[0].username;
                req.session.user_id = test[0].user_id;
                //create the token
                var token = jwt.sign(results,server.secret,{expiresIn:'2h'});
                res.send(200,{status:"ok", secret:token});
            }
            else
            {
                res.send(401,{status:"wrong username or password"});    
            }
        }
    });
};

exports.getFriendsForUserByUsername = function(req,res){

    connection.query('call getFriendsByUsername(?)',[req.session.kayttaja],function(error,results,fields)
    {
        if(results.length > 0)
        {   
            res.send(results[0]);
        }
        else
        {
            res.redirect('/');
        }
    });
};

exports.registerMysql = function(req,res){

    connection.query('insert into user (username,pass) values (?,?);',                                                                [req.body.username,req.body.password],function(error,results,fields)
    {    
        if(error)
        {
            res.status(500).send({status:error.message});
        }
        else
        {
            res.status(200).send({status:"Register succesful"});
        }
        
    });
};

exports.saveNewPersonMysql = function(req,res){    
    
    connection.query('select user.user_id from user where user.username=?;',                                                                [req.session.kayttaja],function(error,results,fields)
    {    
        if(error)
        {
            res.status(500).send({status:error.message});
        }
        else
        {            
            var user_id = results[0].user_id; 
            
            connection.query('insert into friend(name,address,age,user_id) values(?,?,?,?);',                                                                [req.body.name,req.body.address,req.body.age,user_id],function(error,results,fields)
            {    
                if(error)
                {
                    res.status(500).send({status:error.message});
                }
                else
                {
                    var newData = {
                        name:req.body.name,
                        address:req.body.address,
                        age:req.body.age
                    };
                    
                    res.status(200).send({data:newData});
                }        
            });
        }        
    });
}

exports.updatePersonMysql = function(req,res){
    
    connection.query('update friend set name=?,address=?,age=? where _id=?;',                                                                [req.body.name,req.body.address,req.body.age,req.body._id],function(error,results,fields)
            {    
                if(error)
                {
                    res.status(500).send({status:error.message});
                }
                else
                {
                    var newData = {
                        name:req.body.name,
                        address:req.body.address,
                        age:req.body.age
                    };
                    
                    res.status(200).send({data:newData});
                }        
            });
}

exports.deletePersonMysql = function(req,res){
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
        
    for (var i=0;i<toDelete.length;i++)
    {
        connection.query('delete from friend where _id=?;',                                                                                              [toDelete[i]],function(error,results,fields)
        {    
            if(error)
            {
                res.status(500).send({status:error.message});                
            }
        });
    }     
   
    res.status(200).send({message:'Delete success'});            
}

