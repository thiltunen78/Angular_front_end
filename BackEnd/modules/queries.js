var db = require('./database');

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

// this function searches database by name or by begin letters of name
exports.findPersonsByName = function(req,res){
    
    var name = req.params.nimi.split("=")[1];
    
    console.log(req.query.user);
    
    db.Friends.find({username:req.query.user}).populate({path:'friends',match:{name:{'$regex': '^' + name,'$options':'i'}}}).exec(function(err,data){
        
        res.send(data[0].friends);
    });
    
/*    db.Person.find({name:{'$regex': '^' + name,'$options':'i'}},function(err,data){ //ilman hattua(^) hakee jos teksti sisältyy johonkin kohtaan nimiä
        
       if(err){           
           res.send("Error");
       }
        else{
            res.send(data);
        }           
    });*/
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
    
    //what happens here is that req.params.id return "id=4858745834753485".
    //split function splits the string from "=" and creates an array where [0] contains "id" and [1] contains "4858745834753485".
    var id = req.params.id.split("=")[1];
    
    db.Person.remove({_id:id},function(err){
        
        if(err){
            res.send(err.message);
        }
        else{
            
            db.Friends.update({username:req.body.user},
                          {$pull:{'friends':id}},
                         function(err,model){
            
                if(err){
                    console.log(err.message);
                }else{
                    res.send("Delete Ok");
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
                
                res.status(200).send({status:"Ok"});  //200 = ok          
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