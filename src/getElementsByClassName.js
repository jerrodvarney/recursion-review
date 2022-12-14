// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  var node = node || document.body;
  var result = [];

  // default case - if node contains classname
  if (node.classList && node.classList.contains(className)) {
    result.push(node);
  }
  // node has nested children -> runs loop
  if (node.hasChildNodes()) {
    node.childNodes.forEach(function(ele) {
      result = result.concat(getElementsByClassName(className, ele));
    });
  }

  return result;
};
