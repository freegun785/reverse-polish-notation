const rpn = (input) => {
  const table = document.querySelector('.main-table');
  const tr = document.createElement(`tr`);

  let inputExpression = input.value.split(' ');
  let stack = [];
  let outputExpression = [];
  let priority = {
    '(': 5,
    '^': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
    '=': 1,
    ')': 0,
  };

  tr.innerHTML = `<th scope="row">1</th>
            <td>${inputExpression.join(' ')}</td>
            <td></td>
            <td></td>`

  table.append(tr);

  for (let i = 0; i <= inputExpression.length; i++) {
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
    if (i === inputExpression.length) {
      const tr = document.createElement(`tr`);
      const tempStack = stack;

      tr.innerHTML = `<th scope="row">${i + 2}</th>
            <td>${inputExpression.slice(i, inputExpression.length).join(' ')}</td>
            <td>${stack = ''}</td>
            <td>${outputExpression.concat(tempStack.reverse()).join(' ')}</td>`

      table.append(tr);
    } else {
      const tr = document.createElement(`tr`);

      tr.innerHTML = `<th scope="row">${i + 2}</th>
            <td>${inputExpression.slice(i + 1, inputExpression.length).join(' ')}</td>
            <td>${stack.join(' ')}</td>
            <td>${outputExpression.join(' ')}</td>`

      table.append(tr);
    }
  }

};

const button = document.querySelector('.btn-primary');
const dropdownItem = document.querySelectorAll('.dropdown-menu .dropdown-item');
const input = document.querySelector('.form-control');

button.addEventListener('click', () => {
  document.querySelector('.main-table').innerHTML = '';
  document.querySelector('table').classList.remove('d-none');
  rpn(input);
});

dropdownItem.forEach(item => item.addEventListener('click', () => {
  input.setAttribute('value', item.textContent);
}));