function getItems() {
  return JSON.parse(localStorage.getItem('crud-items')) || [];
}


function saveItems(items) {
  localStorage.setItem('crud-items', JSON.stringify(items));
}


function renderItems() {
  const items = getItems();
  const list = document.getElementById('items-list');
  list.innerHTML = '';
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <span>
        <button onclick="editItem(${idx})">Edit</button>
        <button onclick="deleteItem(${idx})">Delete</button>
      </span>
    `;
    list.appendChild(li);
  });
}


document.getElementById('crud-form').onsubmit = function(e) {
  e.preventDefault();
  const id = document.getElementById('item-id').value;
  const name = document.getElementById('item-name').value.trim();
  if (!name) return;
  let items = getItems();
  if (id) {
    
    items[id].name = name;
  } else {
    
    items.push({ name });
  }
  saveItems(items);
  this.reset();
  renderItems();
};


window.editItem = function(idx) {
  const items = getItems();
  document.getElementById('item-id').value = idx;
  document.getElementById('item-name').value = items[idx].name;
};


window.deleteItem = function(idx) {
  let items = getItems();
  items.splice(idx, 1);
  saveItems(items);
  renderItems();
};


renderItems();
