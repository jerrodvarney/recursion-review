// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  json = json.trim();

  console.log(json, typeof json);

  if (json === 'false') {
    return false;
  }

  if (json === 'true') {
    return true;
  }

  if (json === 'null') {
    return null;
  }

  if (typeof json === 'number') {
    return Number(json);
  }

  var test = 'test';
  console.log(JSON.stringify(test), 'First');
  // "test"
  var stringifiedTwice = JSON.stringify(JSON.stringify(test));
  // "\"test\""
  console.log(JSON.stringify(JSON.stringify(JSON.stringify(test))), 'Stringified 2');
  // "\"\\\"test\\\"\""

  console.log(JSON.stringify(JSON.stringify(JSON.stringify(JSON.stringify(test)))), 'Stringified 3');
  // "\"\\\"\\\\\\\"test\\\\\\\"\\\"\""
  console.log(JSON.stringify(JSON.stringify(JSON.stringify(JSON.stringify(JSON.stringify(test))))), 'Stringified 4');
  // "\"\\\"\\\\\\\"\\\\\\\\\\\\\\\"test\\\\\\\\\\\\\\\"\\\\\\\"\\\"\""
  var escapeMapping = {
    '"': '',
    '\"': '"',
  };


  // var patterns = [];
  // var oneString   = ""
  // var twoString   = \"
  // var threeString = \\\"
  // var fourString  = \\\\\\\"
  // var fiveString  = \\\\\\\\\\\\\\\"

  if (json[0] === '"') {
    var patterns = ['\\\\\\\\\\\\\\\"', '\\\\\\\"', '\\\"', '\"', '"'];
    patterns.forEach(function(pattern) {
      if (json.indexOf(pattern)) {
        return json.replace(pattern, '');
      }
    });
    return json;
  }

  if (json[0] === '[') {
    console.log("is Array");
    var result = [];
    if (json === '[]') {
      return result;
    }
    var splitArr = json.slice(1, -1).split(',');
    splitArr.forEach(function(ele) {
      result.push(parseJSON(ele));
    });
    // ['["foo"', ' "bar"']
    return result;
  }

  if (json[0] === '{') {
    console.log("is Object");
    var result = {};
    if (json === '{}') {
      return result;
    }

    var splitObj = json.slice(1, -1).split(',');
    splitObj.forEach(function(obj) {
      var colonIndex = obj.indexOf(':');
      var objKey = parseJSON(obj.slice(0, colonIndex));
      var objValue = parseJSON(obj.slice(colonIndex + 1));

      result[objKey] = objValue;
    });

    console.log(result, 'RESULT');

    return result;
  }


  // var escapePatterns = {
  //   '\\\\': '\\',
  //   '\t': '\'
  // }


};

console.log(parseJSON('{"foo": "bar"}'), 'HEREE');