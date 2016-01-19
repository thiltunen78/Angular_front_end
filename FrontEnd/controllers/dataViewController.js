main_module.controller('controllerDataView',function($scope,dataViewFactory,$location){

    $scope.name = "by Tero Hiltunen";
    $scope.temp = ['Juha Sipilä','Stupido','Timo Soini'];
    
    $scope.navbarData = {
		
		urls:['/logout','#/delete','#/add'],
		texts:['Logout','Delete','Add'],
        classes:['','','']
	}
    
    console.log('controllerDataView loaded');
        
    dataViewFactory.getFriendData(function(dataArray){
        
        $scope.friendData = dataArray;
    });
    
    $scope.rowClicked = function(id){
        
        dataViewFactory.selected_id = id;
        $location.path('/edit').replace();
    }   
     
    $scope.search = function(){
        console.log('search pressed');
        dataViewFactory.search($scope.search_term).then(function(data){
            console.log(data);
            $scope.friendData = data;
            
        });
    }
});