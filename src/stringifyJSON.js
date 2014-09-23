// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var type = typeof(obj) /* number,string, or object */

  switch (type) {
    case 'number':
      return stringifyJSON_number(obj);
      break;
    case 'string':
      return stringifyJSON_string(obj);
      break;
    case 'object':
      return stringifyJSON_object(obj);
      break;
    default:
      console.log('did no recognize obj type');
  }
};

var stringifyJSON_object = function(obj){
  return 'object';
}

var stringifyJSON_string = function(obj){
  return 'string';
}

var stringifyJSON_number = function(obj){
  return 'number';
}
