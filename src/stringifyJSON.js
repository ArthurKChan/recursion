// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var result = '';
  if (typeof obj !== 'object' || obj === null){
    /* BASE CASE */
    return typeof obj === 'string' ? '"'+obj+'"' : String(obj);
  }
  else {
    if(obj instanceof Array){
      result += '[';
      for(var i=0; i < obj.length; i++){
        if( obj[i] instanceof Function || obj[i] === undefined){/*array functions and undefined values are set to 'null'*/
          result += 'null,';
        }
        else{
          /* JSON.stringify(Array) only works on 0-n indexed values, therefore using obj.length*/
          /* appends result in Array format */
          result += stringifyJSON(obj[i])+',';
        }
      }
      /* delete hanging ',' */
      if(obj.length > 0){ result = result.slice(0,result.length-1); }
      result += ']';
    }
    else{
      result += '{';
      for(var i in obj){
        if( !(obj[i] instanceof Function) && obj[i] !== undefined){/*keys with functions and undefined values are ignored*/

          /* stringifies all keys of the object */
          /* appends result in Object format */
          result += '"' + String(i) + '":' + stringifyJSON(obj[i]) + ',';
        }
      }
      if(result[result.length-1] === ','){
        /* delete hanging ',' */
        result = result.slice(0,result.length-1);
      }
      result += '}';
    }    
    return result;
  }
}
