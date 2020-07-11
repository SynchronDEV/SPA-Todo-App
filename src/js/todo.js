
/* Todo app javascript */
const clear = document.querySelector('.clear');
const date = document.querySelector('#date');
const list = document.querySelector('#list');
const form = document.querySelector('.add-item');
const input = document.querySelector('#input');
const addButton = document.querySelector('.add-button');

const checkedClass = 'checked';

const renderEvent = new Event('statechange', { bubbles: true })

let state = localStorage.getItem('TODO') 
            ? JSON.parse(localStorage.getItem('TODO'))
            : [];


date.innerHTML = new Date().toLocaleDateString('en-us', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

const addToDo = (todoValue) => {
  const newTodo = {
    name: todoValue,
    id: state.length + 1,
    done: false,
    removed: false,
  }

  state = [...state, newTodo];
  document.dispatchEvent(renderEvent);
  localStorage.setItem('TODO', JSON.stringify(state));
};

const loadList = () => {
  state.forEach((todo) => {
    if (todo.removed) { return; }
    if(todo.done) {
      document.getElementById(`${todo.id}`).checked = true;
      document.getElementById(`${todo.id}`).parentNode.style.order = 1;
    } else {
      document.getElementById(`${todo.id}`).checked = false;
      document.getElementById(`${todo.id}`).parentNode.style.order = 0;
    }
  })
};

const completeToDo = (element) => {
  const clickedElement = element;

  element.classList.toggle(checkedClass); // Toggles 'checked' class
  state[element.id - 1].done = !state[element.id - 1].done; // Toggles true/false on todo.done

  const checked = element.classList.value; // Checks if element has checked class. If yes, item is ordered to the bottom of the todos
  if (checked === 'checked') {
    clickedElement.parentNode.style.order = 1;
  } else {
    clickedElement.parentNode.style.order = 0;
  }
  localStorage.setItem('TODO', JSON.stringify(state));
};

const removeToDo = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  state[element.id - 1].removed = true;
  localStorage.setItem('TODO', JSON.stringify(state));
};

list.addEventListener('click', (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob === 'done') {
    completeToDo(element);
  } else if (elementJob === 'delete') {
    removeToDo(element);
  }
  
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoValue = input.value;
  if (todoValue) {
    addToDo(todoValue);
  }
  input.value = '';
})

clear.addEventListener('click', () => {
  window.localStorage.clear();
  window.location.reload();
});

const generateHTML = (todos) => {
  return todos.map(todo => {
    if (todo.removed) { return; }
    return `
      <li class="item">
      <input type="checkbox" job="done" class="" id="${todo.id}">
      <p class="text">${todo.name}</p>
      <input type="submit" value="Remove" job="delete" class="button delete" id="${todo.id}">
      </li>
    `
  }).join('');
}

const renderState = (newState) => { 
  list.innerHTML = generateHTML(newState);
  loadList();
};

document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(renderEvent);
});

document.addEventListener('statechange', () => renderState(state));
