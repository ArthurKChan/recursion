// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json){
  //console.log('json =',json);
  var st = tokenize(json);
  //console.log('token list =',st);
  var ans = parseN(st);
  //console.log('answer =',ans);
  return ans;
}

var parseN = function(st) {
  var token = st.shift();
  if( isBase(token) ){
    return token;
  }
  else if( token === '[' ){
    
    return parseA(st);
  }
  else if( token === '{' ){
    return parseO(st);
  }
  else {
    throw new SyntaxError('Could not recognize token');
  }
}

function parseA(st){
  var result = [], token;

  while( ( token = st.shift() ) !== ']' ){
    if( isBase(token) ){
      result.push(token);
    }
    else if( token === '[' ){
      result.push(parseA(st));
    }
    else if( token === '{' ){
      result.push(parseO(st));
    }
    else{
      throw new SyntaxError('Could not recognize token');
    }

    if( st[0] === ',' ){
      st.shift();
    }
    
    if( st.length === 0 ){
      throw new SyntaxError('Expected a closing ]');
    }
  }
  return result;
}

function parseO(st){
  var result = {};
  while( ( token = st.shift() ) !== '}' ){
    if( st.shift() !== ':' ){
      throw new SyntaxError('Expected a colon');
    }

    result[token] = parseN(st);

    if( st[0] === ',' ){
      st.shift();
    }
    
    if( st.length === 0 ){
      throw new SyntaxError('Expected a closing }');
    }
  }
  return result;
}


/*  Input: token
    Output: true if base case, false if not
*/
function isBase(token){
  if ( token === null){
    return true;
  }
  else if ( !( token.length === 1 && (/\{|\:|\,|\}|\[|\]/).test(token)) ){ 
    return true;
  }
  else{
    return false;
  }
}


/*  Input:  JSON string
    Output: list of tokens from the string
*/
function tokenize(_st){
  var list = [], st = new Array(), token, loop_condition=true;
  st = _st.split('');
  token = st.shift();
  /* shift off tokens from st and push them into list */

  while( loop_condition && token!==undefined ){
    /* Loop check */
    if ( st.length === 0){
      loop_condition = false;
    }

    while ( (/\s/).test(token) ){
      /* remove whitespaces */
      token = st.shift();
    }

    /* check if single char token */
    if( (/\{|\:|\,|\}|\[|\]/).test(token) ){
      list.push(token);
      token = st.shift();
    }

    else if ( (/[0-9]/).test(token) || token === '-' ){
      /* NUMBER TOKEN */
      var temp=[];
      while ( (/[0-9]|\./).test(token) || token === '-'){
        temp.push(token);
        token = st.shift();
      }
      list.push(Number(temp.join('')));
    }

    else if( (/"/).test(token) ){
      /* STRING TOKEN */
      var temp = [];
      token = st.shift();
      while ( token !== '"' ){
        if(st.length === 0){
          throw new SyntaxError('Expected a closing " mark');
        }
        temp.push(token);
        token = st.shift();
      }
      list.push(temp.join(''));
      token = st.shift();
    }
    
    else if( token === 'n' ){
      /* NULL TOKEN */
      var temp = [token];
      for(var i=0; i<3; i++){
        temp.push(st.shift())
      }
      if(temp.join('') !== 'null'){ throw new SyntaxError('Expected null'); }
      token = st.shift();
      list.push(null);
    }
    
    else if( token === 't' ){
      /* BOOLEAN TRUE TOKEN */
      var temp = [token];
      for(var i=0; i<3; i++){
        temp.push(st.shift())
      }
      if(temp.join('') !== 'true'){ throw new SyntaxError('Expected true'); }
      token = st.shift();
      list.push(true);
    }
    
    else if( token === 'f' ){
      /* BOOLEAN FALSE TOKEN */
      var temp = [token];
      for(var i=0; i<4; i++){
        temp.push(st.shift())
      }
      if(temp.join('') !== 'false'){ throw new SyntaxError('Expected to be true'); }
      token = st.shift();
      list.push(false);
    }

    else{
      throw new SyntaxError('Unrecognizable character');
    }
  }
  return list;
}

