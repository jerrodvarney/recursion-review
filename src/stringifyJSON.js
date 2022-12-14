// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

  //Base Cases
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  }

  if (obj === null) {
    return 'null';
  }

  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }

  //Recursive Array Case
  if (Array.isArray(obj)) {
    var result = [];
    obj.forEach(function(ele) {
      if (ele === undefined || typeof obj === 'function') {
        return result.push('null');
      }

      result.push(stringifyJSON(ele));
    });

    return '[' + result.join(',') + ']';
  }

  //Recursive Obj Case
  if (typeof obj === 'object' || !Array.isArray(obj)) {
    var result = '';

    Object.keys(obj).forEach(function(key) {
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        return;
      }
      result += stringifyJSON(key) + ':' + stringifyJSON(obj[key]) + ',';
    });

    return '{' + result.slice(0, -1) + '}';
  }
};
