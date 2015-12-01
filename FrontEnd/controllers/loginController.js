//This is the way you define controllers.
//The main_module variable is defined in mainModule.js file(located in module folder)
//The first argument is the name of the controller. This is important, because you use THIS name when you want to use this controller in some view.
//The $scope object is the glue between the view and controller. You use this object to transfer data between the view and controller.
main_module.controller('controllerLogin',function($scope,loginFactory){
    
    //var user = $scope.user;
    //$scope.pass = "halituli";
    
    //This is called when login button is pressed in parial_login.html
    $scope.loginClicked = function(){
        
        console.log("login pressed");
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        loginFactory.startLogin(temp);
    }
    
    $scope.registerClicked = function(){
        
        console.log("register pressed");
    }
});