main_module.factory('dataViewFactory',function($resource){

    var factory = {};
    
    // in this array we cache the friends information,
    // so that once stored in array we wont make any further request
    factory.friendsArray = [];
    
    factory.getFriendData = function(){
    
        var resource = $resource('/friends',{},{'get':{method:'GET'}});
        return resource.query().$promise;       
    };
    
    return factory;
});