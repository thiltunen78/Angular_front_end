var express = require("express");
var query = require('./queries');

var router = express.Router();

// handle get request for /persons context
router.get('/',function(req,res){
    query.getAllPersons(req,res);
});

router.get('/search', function(req,res){    
    query.findPersonsByName(req,res);    
});

// handle post request for /persons context
router.post('/',function(req,res){
    query.saveNewPerson(req,res);
});

router.put('/',function(req,res){
    query.updatePerson(req,res);
});

router.delete('/',function(req,res){
    
    query.deletePerson(req,res);
});

module.exports = router;