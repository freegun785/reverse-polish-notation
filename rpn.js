let inputExpression = 'r / ( ( g - h + k ) * ( a + s - d ) ) * f = g * ( a - s ) - l'.split(' ');
let stack = [];
let outputExpression = []
let priority = {
  ')': 0,
  '^': 4,
  '*': 3,
  '/': 3,
  '+': 2,
  '-': 2,
  '=': 1,
  '(': 5,
};

for (let i = 0; i < inputExpression.length; i++) {
  if (inputExpression[i] in priority && stack.length !== 0) {

    if (priority[inputExpression[i]] === priority[stack[stack.length - 1]]) {
      if (inputExpression[i] != '(') {
        outputExpression.push(stack[stack.length - 1]);
        stack.pop();
      }
      stack.push(inputExpression[i])

    } else if (priority[inputExpression[i]] > priority[stack[stack.length - 1]]) {
      stack.push(inputExpression[i]);

    } else if (priority[inputExpression[i]] < priority[stack[stack.length - 1]] && inputExpression[i] !== ')') {
      while (priority[inputExpression[i]] <= priority[stack[stack.length - 1]] && stack[stack.length - 1] !== '(') {
        if (stack[stack.length - 1] !== '(') {
          outputExpression.push(stack[stack.length - 1]);
          stack.pop();
        } else {
          break;
        }
      }
      stack.push(inputExpression[i]);
    } else {
      outputExpression.push(stack[stack.length - 1]);
      stack.pop();
      stack.splice(stack.lastIndexOf('('), 1);
    }
  } else {
    if (inputExpression[i] in priority && stack.length === 0) stack.push(inputExpression[i]);
    if (!(inputExpression[i] in priority)) outputExpression.push(inputExpression[i]);
  }
  console.log(stack)
}

let result = outputExpression.concat(stack.reverse());
console.log(result);