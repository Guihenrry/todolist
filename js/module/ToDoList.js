export default class ToDoList {
  constructor(input, buttonAdd, list) {
    this.input = document.querySelector(input);
    this.buttonAdd = document.querySelector(buttonAdd);
    this.list = document.querySelector(list);

    this.textArray = [];

    this.addTextByInput = this.addTextByInput.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  add(text) {
    this.textArray.push(text);
  }

  remove(index) {
    this.textArray.splice(index, 1);
  }

  addRemoveEvent(element) {
    const buttonRemove = element.querySelector('.todo-remove');
    const indexElement = buttonRemove.getAttribute('data-todo');

    buttonRemove.addEventListener('click', () => {
      element.remove();
      this.remove(indexElement);
      this.createListByArray();
    });
  }

  createNewElement(text, index) {
    const div = document.createElement('div');
    div.classList.add('todo-item');

    div.innerHTML = `
      <p class="todo-text">${text}</p>
      <button data-todo="${index}" class="todo-remove" title="concluir">Concluir</button>
    `;

    this.addRemoveEvent(div);
    return div;
  }

  updateLocalStorage() {
    window.localStorage.textArray = JSON.stringify(this.textArray);
  }

  createListByArray() {
    this.list.innerHTML = '';

    this.textArray.forEach((text, index) => {
      const item = this.createNewElement(text, index);
      this.list.appendChild(item);
    });

    this.updateLocalStorage();
  }

  addTextByInput() {
    if (this.input.value !== '') {
      this.add(this.input.value);
      this.input.value = '';
      this.createListByArray();
    }
  }

  handleKeyup({ key }) {
    if (key === 'Enter') this.addTextByInput();

  }

  getLocalStorage() {
    if (window.localStorage.textArray) {
      this.textArray = JSON.parse(window.localStorage.textArray);
      this.createListByArray();
    }
  }

  addToDoEvents() {
    this.buttonAdd.addEventListener('click', this.addTextByInput);

    document.addEventListener('keyup', this.handleKeyup);
  }

  init() {
    if (this.input && this.buttonAdd && this.list) {
      this.addToDoEvents();
      this.getLocalStorage();
    }
    return this;
  }

}