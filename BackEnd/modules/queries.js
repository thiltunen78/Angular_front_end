var db = require('./database');
var jwt = require('jsonwebtoken');
var server = require('../index'); //index.js

// this function gets all documents from person collection
exports.getAllPersons = function(req,res){
    
    db.Person.find(function(err,data){
        
       if(err){
           console.log(err.message);
           res.send("Error in database");
       }
        else{
            res.send(data);
        }
           
    });
}

/**
  *This function seraches database by name or 
  *by begin letters of name
  */
exports.findPersonsByName = function(req,res){

    var name = req.query.name;

    db.Friends.findOne({username:req.session.kayttaja}).
        populate({path:'friends',match:{name:{'$regex':'^' + name,'$options':'i'}}}).
            exec(function(err,data){
        res.send(data.friends);
    });
    
}
                          
// this function saves new person information to our person collection
exports.saveNewPerson = function(req,res){    
    
    var personTemp = new db.Person(req.body);
    //Save it to database
    personTemp.save(function(err,newData){
        
        db.Friends.update({username:req.session.kayttaja},
                          {$push:{'friends':personTemp._id}},
                          function(err,model){
            
            //console.log("SEND REDIRECT!!!!!");
            //Make a redirect to root context
            //res.redirect(301,'/persons.html');
            if(err){
                
                res.status(500).json({message:'Fail'});
            }else{
                
                res.status(200).json({data:newData});
            }
        });
     
    });
}

//this function removes one person from our person collection
exports.deletePerson = function(req,res){
    
    var toDelete = [];
    if(req.query.forDelete instanceof Array)
        toDelete = req.query.forDelete;
    else{
        
       toDelete.push(req.query.forDelete); 
    }
    
    db.Person.remove({_id:{$in:toDelete}},function(err,data){
        
        if(err){
            console.log(err);
            res.status(500).send({message:err.message});
        }else{
            
            db.Friends.update({username:req.session.kayttaja},{$pull:{'friends':{$in:toDelete}}},function(err,data){
                if(err){
                    console.log(err);
                    res.status(500).send({messsage:err.message});
                }else{
                    
                    res.status(200).send({message:'Delete success'});
                }
            });
        }
    });
}

//this method updates one person info
exports.updatePerson = function(req,res){
    
    var updateData = {
        name:req.body.name,
        address:req.body.address,
        age:req.body.age
    }
    
    db.Person.update({_id:req.body._id},updateData,function(err){
       res.send("updated"); 
    });
}

exports.registerFriend = function(req,res){

    var friend = new db.Friends(req.body);
    friend.save(function(err){
    
        if(err){
            res.status(500).send({status:err.message});
        }
        else{
            res.status(200).send({status:"Register succesful"});
        }
    });
}

exports.loginFriend = function(req,res){

    var searchObject = {
        username:req.body.username,
        password:req.body.password
    };
    
    db.Friends.findOne(searchObject,function(err,data){
    
        if(err){
            res.status(500).send({status:err.message});   
        }
        else{
            //=< 0 means wrong username or password
            if(data){
                
                req.session.kayttaja = data.username;
                
                //create the token
                var token = jwt.sign(data,server.secret,{expiresIn:'2h'});
                
                res.status(200).send({status:"Ok",secret:token});  //200 = ok          
            }
            else{
                res.status(401).send({status:"Wrong username or password"});
            }
        }
    });
}

exports.getFriendsByUsername = function(req,res){

    //var usern = req.params.username.split("=")[1];
    db.Friends.findOne(/*{username:usern}*/{username:req.session.kayttaja}).populate('friends').exec(function(err,data){
        
        if(data){
            res.send(data.friends);
        }else{
            res.redirect('/');
        }
    });
}