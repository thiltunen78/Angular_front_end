// Here we create our main module. First argument is the name of the module
//,the second one the '[] array' contains the dependencies to other angural modules.
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

//this function will check if user is logged in or not. this function is used in the router below in resolve attribute.
function loginRequired($q,$resource,$location,$http){
 
    //Create a promise    
    var deferred = $q.defer();
    
    $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
    
    $resource('/isLogged').query().$promise.then(function success(){
    
        //mark the promise to be solved (or resolved)
        deferred.resolve();
        
        return deferred;
        
    },function fail(){
        
        //mark the promise to be failed
        deferred.reject();
        
        //go back to root context
        $location.path('/');
        
        return deferred;    
    });    
}

//Create basic configuration for our angular app.
//Configuration includes USUALLY a router for our views.
//The routeProvider object comes from ngRoute module.
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
      
        templateUrl:'partial_login.html',
        controller:'controllerLogin'
        
    }).when('/list',{
        
        templateUrl:'partial_dataView.html',
        controller:'controllerDataView',
        resolve:{loginRequired:loginRequired}
        
    }).when('/add',{
        
        templateUrl:'partial_add.html',
        controller:'controllerAdd',
        resolve:{loginRequired:loginRequired}
        
    }).when('/edit',{
        
        templateUrl:'partial_edit.html',
        controller:'controllerEdit',
        resolve:{loginRequired:loginRequired}
        
    }).when('/delete',{
        
        templateUrl:'partial_delete.html',
        controller:'controllerDelete',
        resolve:{loginRequired:loginRequired}
        
    });
});