// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var result = [], selector;
  arguments[1] ? selector=arguments[1] : selector=document.body;
  if(Array.prototype.indexOf.call(selector.classList, className) !== -1){
    result.push(selector);
  }
  for(var i=0; i<selector.children.length; i++){
    result = result.concat(getElementsByClassName(className,selector.children[i]));
  }
  return result;
}
