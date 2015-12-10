main_module.controller('controllerEdit',function($scope,dataViewFactory,$location,Flash){
        
    var selectedFriend = dataViewFactory.getSelectedFriend();
    
    $scope.id = selectedFriend._id;
    $scope.name = selectedFriend.name;
    $scope.address = selectedFriend.address;
    $scope.age = selectedFriend.age;
    
    $scope.updateClicked = function(){
                
        var temp = {
            
            _id:$scope.id,
            name:$scope.name,
            address:$scope.address,
            age:$scope.age
        }
                 
        var waitPromise = dataViewFactory.updatePersonData(temp);
        //wait the response from server
        waitPromise.then(function(data){
                    
            //clear friends array to get udated data from backend when exit button is clicked
            dataViewFactory.friendsArray = [];
                        
            $location.path('/list').replace();
            
        },function error(data){  
                          
            Flash.create('warning', 'Failed to update friend!', 'custom-class');
        });
    }    
   
});