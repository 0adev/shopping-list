const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");

// * ADD ITEMS:
const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate Input:
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // create list Item:
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

// * REMOVE ITEMS:
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
  }
};

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
};

// Event Listeners:
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearAllItems);
