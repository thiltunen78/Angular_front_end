main_module.controller('controllerDataView',function($scope,dataViewFactory){

    console.log('controllerDataView loaded');
    
    if(dataViewFactory.friendsArray.length === 0)
    {
        var response = dataViewFactory.getFriendData();
    
        response.then(function(data){
    
            dataViewFactory.friendsArray = data;
            $scope.friendData = data;
            
        },function(error){
    
    
        });
    }
    else
    {
        $scope.friendData = dataViewFactory.friendsArray;   
    }   
     
});