// Basic tree structure
var TreeNode = function (name) {
  this.name = name;
  this.parent = null;
  this.childNodes = [];

  this.addChild = function (name) {
    var newChild = new TreeNode(name);
    newChild.parent = this;
    this.childNodes.push(newChild);

    return newChild;
  }
}

var Tree = function (name) {
  this.root = new TreeNode(name);
}

// Tree Creation
var myTree = new Tree('Root');
var odin = myTree.root.addChild('Odin');
var thor = odin.addChild('Thor');
var magni = thor.addChild('Magni');
thor.addChild('Modi');
odin.addChild('Baldr');
odin.addChild('Tyr');

var loki = myTree.root.addChild('Loki');
loki.addChild('Jormungandr');
loki.addChild('Hel');
loki.addChild('Fenrir');

var njord = myTree.root.addChild('Njord');
njord.addChild('Frey');
njord.addChild('Freyja');

// Wrapper function for the recursion
function searchParentsWrapper(startingNode, term) {
  // Create the return parents array
  var parents = [];

  // Recursive traversal up the tree till we hit the root
  function recursiveSearchUp(node) {
    node = node.parent;

    // If aven't reached the root
    if (node) {
      // Check the search term and add to the array if needed
      if (node.name.includes(term)) {
        parents.push(node.name)
      }

      // Traverse up
      return recursiveSearchUp(node);
    }
  }

  // Call seach function
  recursiveSearchUp(startingNode);
  return parents;
};

// Recursion with out wrapper function
function searchParentsRecursive(node, term, results) {
  // This is open for bad user input in the third param
  // Initiating the results array if this is the first iteration
  var results = results || [];

  // Starting with the parent
  node = node.parent;

  // If we haven't reached the root
  if (node) {
    // Check for the term and add to the result array
    if (node.name.includes(term)) {
      results.push(node.name);
    }

    // Traverse up
    return searchParentsRecursive(node, term, results);
  }

  return results;
}

var aParents = searchParentsRecursive(magni, 'o');
console.log(aParents.join(', '));
aParents = searchParentsWrapper(magni, 'o');
console.log(aParents.join(', '));
