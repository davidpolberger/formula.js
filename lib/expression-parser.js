var jsep = require('jsep');

jsep.addBinaryOp('=', 6);

var binops = {
  '+' : function(a, b) { return a + b; },
  '-' : function(a, b) { return a - b; },
  '*' : function(a, b) { return a * b; },
  '/' : function(a, b) { return a / b; },
  '%' : function(a, b) { return a % b; },
  '>' : function(a, b) { return a > b; },
  '>=' : function(a, b) { return a >= b; },
  '<' : function(a, b) { return a < b; },
  '<=' : function(a, b) { return a <= b; },
  '=' : function(a, b) { return a == b; },
  '==' : function(a, b) { return a == b; },
  '!=' : function(a, b) { return a !== b; }
};
var unops = {
  '-' : function(a) { return -a; },
  '!' : function(a) { return !a; }
};
var logops = {
  '&&' : function(a, b) { return a && b; },
  '||' : function(a, b) { return a || b; }
};

function do_eval(node, variables) {
  if (node.type === 'BinaryExpression') {
    var binop = binops[node.operator];
    if (!binop) {
      throw new Error('Unknown binary operator ' + node.operator);
    }
    return binop(do_eval(node.left), do_eval(node.right));
  } else if (node.type === 'UnaryExpression') {
    var unop = unops[node.operator];
    if (!unop) {
      throw new Error('Unknown unary operator ' + node.operator);
    }
    return unop(do_eval(node.argument));
  } else if (node.type === 'LogicalExpression') {
    var logop = logops[node.operator];
    if (!logop) {
      throw new Error('Unknown logical operator ' + node.operator);
    }
    return logop(do_eval(node.left), do_eval(node.right));
  } else if (node.type === 'Literal') {
    return node.value;
  } else if (node.type === 'Identifier') {
    return node.name;
    // NOTE: Excel treats undecorated text as a string literal -- not an identifier
    //return variables ? variables[node.name] : undefined;
  } else {
    throw new Error('Unsupported expr node', node);
  }
}

module.exports = function evalExpr(expr, variables) {
  var ast = jsep(expr);
  return do_eval(ast, variables);
};
