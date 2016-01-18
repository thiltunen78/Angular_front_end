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
    //define the template code
    directive.templateUrl = "/FrontEnd/directives/content.html";

    //we must always return an object from directive!
    return directive;
});