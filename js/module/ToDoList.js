export default class ToDoList {
  constructor(input, buttonAdd, list) {
    this.input = document.querySelector(input);
    this.buttonAdd = document.querySelector(buttonAdd);
    this.list = document.querySelector(list);

    this.arrayList = [];
  }

  add(text) {
    this.arrayList.push(text);
  }

}