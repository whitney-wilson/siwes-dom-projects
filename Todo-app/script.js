const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-button");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function save() { localStorage.setItem("todos", JSON.stringify(todos)); }

function render() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " completed" : "");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = todo.done;

    const span = document.createElement("span");
    span.textContent = todo.text;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "small";

    cb.addEventListener("change", () => {
      todos[i].done = cb.checked;
      save(); render();
    });

    del.addEventListener("click", () => {
      todos.splice(i, 1);
      save(); render();
    });

    li.append(cb, span, del);
    list.appendChild(li);
  });
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  input.value = "";
  save(); render();
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });

render();
