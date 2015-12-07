// Here we create our main module. First argument is the name of the module
//,the second one the '[] array' contains the dependencies to other angural modules.
var main_module = angular.module('main_module',['ngRoute','ngResource']);

//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The routeProvider object comes from ngRoute module.
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
      
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
    }).when('/list',{
        
        templateUrl:'partial_dataView.html',
        //controller:'controllerDataView'        
    });
});