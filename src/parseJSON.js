// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
};

/*  Input:  JSON string
    Output: list of tokens from the string
*/
function tokenize(_st){
  var list = [], st = new Array(), token;
  st = _st.split('');
  token = st.shift();
  /* shift off tokens from st and push them into list */

  while( st.length > 0 ){

    /* check if single char token */
    if( (/\{|\:|\,|\}|\[|\]|"/).test(token) ){
      list.push(token);
      token = st.shift();
    }

    else if ( (/[0-9]/).test(token) ){
      /* NUMBER TOKEN */
      var temp=[];
      while ( (/[0-9]|\./).test(token) ){
        temp.push(token);
        token = st.shift();
      }
      list.push(temp.join(''));
    }

    else if ( (/[a-zA-Z]|_/).test(token) ){
      /* WORD TOKEN */
      var temp=[];
      while ( (/[a-zA-Z0-9]|_/).test(token) ){
      /* 0-9 can be other chars in word token */
        temp.push(token);
        token = st.shift();
      }
      list.push(temp.join(''));
    }
    else{
      console.log('Could not recognize token!');
    }
  }
  return list;
}

