main_module.factory('dataViewFactory',function($resource,$http){

    var factory = {};
    factory.selected_id = null;
    // in this array we cache the friends information,
    // so that once stored in array we wont make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function(callbackFunc){
        
        if(factory.friendsArray.length === 0){
            
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            
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
             
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
                
        return resource.post(data).$promise; 
    };
    
    factory.updatePersonData = function(data){
             
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        var resource = $resource('/persons',{},{'put':{method:'PUT'}});
                
        return resource.put(data).$promise; 
    };
    
    factory.getSelectedFriend = function(){
        
        for(var i=0;i<factory.friendsArray.length;i++){
        
            if(factory.friendsArray[i]._id === factory.selected_id){
                return factory.friendsArray[i];
            }
        }    
    };
    
    factory.deleteData = function(data){
        
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        $http.defaults.headers.common['content-type'] = 'application/json'; 
        var resource = $resource('/persons',{},{'delete':{method:'DELETE'}});
        return resource.delete(data).$promise;
    }
    
    factory.search = function(term){
        
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        
        var resource = $resource('/persons/search/',{name:term},{'get':{method:'GET'}});
        return resource.query().$promise;
    }
    
    return factory;
});