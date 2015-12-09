main_module.factory('dataViewFactory',function($resource){

    var factory = {};
    factory.selected_id = null;
    // in this array we cache the friends information,
    // so that once stored in array we wont make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function(callbackFunc){
        
        if(factory.friendsArray.length === 0){
            var resource = $resource('/friends',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
              factory.friendsArray = data;
              callbackFunc(factory.friendsArray);    
                
            },function(error){
                
                factory.friendsArray = [];
                callbackFunc(factory.friendsArray);
            });
        }
        else{
            
            callbackFunc(factory.friendsArray);
        }
    }
    
    factory.addPersonData = function(data){
             
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
                
        return resource.post(data).$promise; 
    };
    
    return factory;
});