main_module.factory('loginFactory',function($resource){
    
    var factory = {};
    
    //This function can be called from any controller using this factory implementation
    factory.startLogin = function(data){
        
        console.log(data);
        
        //create a resource for context '/friends/login'
        var req = $resource('/friends/login',{},{'post':{method:'POST'}});
        
        //use POST method to send the username and password to above context.
        //Note that we return an promise object from here.
        return req.post(data).$promise;        
    }
    
    //This function can be called from any controller using this factory implementation
    factory.startRegister = function(data){
        
        console.log(data);
        
        //create a resource for context '/friends/register'
        var req = $resource('/friends/register',{},{'post':{method:'POST'}});
        
        //use POST method to send the username and password to above context.
        //Note that we return an promise object from here.
        return req.post(data).$promise;        
    }
    
    //factory must always return an object!
    return factory;
});