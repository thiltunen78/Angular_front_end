//create new directive with name ofExample
main_module.directive('ofExample',function(){ //ofExample = opiframe example

    //create empty object. we will fill it with needed information below.
    var directive = {};
    //first define how our directive can be used using the strict attribute
    //possible vakulues are:
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    //or combination of previous values like 'AE'
    directive.restrict = 'AEC';
    
    //create isolated scope for our directive
    //From this point on our directive CANNOT use parent scope
    directive.scope = {
    
        //text binding
        nimi:'@munnimi',
        //two way binding
        users:'='
    }
    
    //normally you just override the link function in your directive
    directive.link = function(scope,elem,attrs){
        
        $(elem).click(function(){
           
            console.log('directive clicked');
            scope.getWeather();
        });
    }
    
    //you can also define own controller for your directive
    directive.controller = function($scope,$http){
    
        console.log('directive controller activated');
        
        $scope.getWeather = function(){
            
            $http.get('http://api.openweathermap.org/data/2.5/weather?q={oulu}').then(function(data){
               
                console.log(data);
                $scope.temp = data.temp;
            });
                  
        };
    };
    
/*    
    //compile function is called before this directive is rendered on browser window.
    directive.compile = function(elem,attrb){
    
        //Use jQuery to set bacgroud for our directive element
        $(elem).css('background-color','lightgrey');
        
        //Compile must always return link function.
        //Link fuction is called when component is rendered on browser window
        return function link(scope,elem,attrs){
            
            console.log(scope.nimi);
            console.log(scope.users);
        }        
    }*/
    
    //define the template code
    directive.templateUrl = "/FrontEnd/directives/content.html";

    //we must always return an object from directive!
    return directive;
});