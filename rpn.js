let inputExpression = 'A + ( x * b + c ) = y'.split(' ');
let stack = [];
let outputExpression = []
let priority = {
  ')': 5,
  '^': 4,
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  '=': 1,
  '(': 0,
};

for (let i = 0; i < inputExpression.length; i++) {
  if (inputExpression[i] in priority && stack.length !== 0) {
    if (priority[inputExpression[i]] === priority[stack[stack.length - 1]]) {
      outputExpression.push(stack[stack.length - 1]);
      stack.pop();
      stack.push(inputExpression[i])
    } else if (priority[inputExpression[i]] > priority[stack[stack.length - 1]]) {
      stack.push(inputExpression[i]);
    } else if (priority[inputExpression[i]] < priority[stack[stack.length - 1]]) {
      while (priority[inputExpression[i]] <= priority[stack[stack.length - 1]]) {
        outputExpression.push(stack[stack.length - 1]);
        stack.pop();
      }
      stack.push(inputExpression[i]);
    }
  } else {
    if (inputExpression[i] in priority && stack.length === 0) stack.push(inputExpression[i]);
    if (!(inputExpression[i] in priority)) outputExpression.push(inputExpression[i]);
  }
  console.log(stack);
}

let result = outputExpression.concat(stack.reverse());
console.log(result);