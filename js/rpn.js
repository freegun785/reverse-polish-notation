const rpn = (input) => {
  const table = document.querySelector('.main-table');
  const tr = document.createElement(`tr`);
  const alertSuccess = document.querySelector('.alert-primary');

  let inputExpression = input.value.split(' ');
  let stack = [];
  let outputExpression = [];
  let priority = {
    '(': 5,
    '!': 4,
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
        if (stack[stack.length - 1] !== '(') outputExpression.push(stack[stack.length - 1]);
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
      alertSuccess.innerHTML = `Результат преобразования: <b><u>${outputExpression.concat(tempStack.reverse()).join(' ')}</u></b>`
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
const alertError = document.querySelector('.alert-danger');
const alertSuccess = document.querySelector('.alert-primary');

button.addEventListener('click', () => {
  if (validator(input.value) && input.value != '') {
    document.querySelector('.main-table').innerHTML = '';
    document.querySelector('table').classList.remove('d-none');
    alertError.classList.add('d-none');
    console.log(validator(input.value));
    rpn(input);
    alertSuccess.classList.remove('d-none');

  } else {
    document.querySelector('table').classList.add('d-none');
    alertError.classList.remove('d-none');
    alertError.innerHTML = (input.value != '') ? "Проверьте корректность расстановки скобок в выражении" : "Строка ввода выражения не должна быть пуста"
  }
});

dropdownItem.forEach(item => item.addEventListener('click', (e) => {
  input.value = item.innerHTML;
}));

const validator = (str) => {
  let opens = str.match(/\(/g) || [];
  let closes = str.match(/\)/g) || [];

  return opens.length === closes.length;
};