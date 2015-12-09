main_module.controller('controllerDataView',function($scope,dataViewFactory){

    console.log('controllerDataView loaded');
        
    dataViewFactory.getFriendData(function(dataArray){
        
        $scope.friendData = dataArray;
    });
    
    $scope.rowClicked = function(id){
        
        dataViewFactory.selected_id = id;
        $location.path('/edit').replace();
    }   
     
});