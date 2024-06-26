const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
// Validate Input:
const errorMessage = document.querySelector(".error-message");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filterItem = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  CheckUI();
};

// * ADD ITEMS:
const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    // alert("Please add an item");
    itemInput.style.borderColor = "#ff2200";
    itemInput.style.marginBottom = "0";
    errorMessage.style.display = "flex";
    return;
  } else {
    itemInput.style.borderColor = "#ccc";
    itemInput.style.marginBottom = "20px";
    errorMessage.style.display = "none";
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
  } else {
    if (checkIfItemExist(newItem)) {
      itemInput.style.marginBottom = "0";
      itemInput.style.border = "1px solid red";
      errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> The item already exists!`;
      errorMessage.style.display = "flex";
      return;
    } else {
      itemInput.style.borderColor = "#ccc";
      itemInput.style.marginBottom = "20px";
      errorMessage.style.display = "none";
      errorMessage.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please add an item`;
    }
  }

  // Create item DOM element
  addItemToDOM(newItem);

  // Add item to local storage
  addItemToStorage(newItem);

  CheckUI();

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

const addItemToDOM = (item) => {
  // create list Item:
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  // Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExist = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;

  document
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#8cd632";
  itemInput.value = item.textContent;
};

// * REMOVE ITEMS:
const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // Remove items from DOM
    item.remove();

    // Remove items from local storage
    removeItemFromStorage(item.textContent);

    CheckUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  if (clearButton) {
    alert("Are you sure?");
  }

  // Clear all items from local storage
  localStorage.removeItem("items");

  CheckUI();
};

//* Remove the filter field and clear button when no item exists:
const CheckUI = () => {
  const item = document.querySelectorAll("li");

  if (item.length === 0) {
    filterItem.style.display = "none";
    clearButton.style.display = "none";
    itemInput.style.borderColor = "#ccc";
    itemInput.style.marginBottom = "20px";
    errorMessage.style.display = "none";
  } else {
    filterItem.style.display = "block";
    clearButton.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
  itemInput.value = "";

  return;
};

//* Filter Items:
const filterItems = (e) => {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

//! Initialze app:
const init = () => {
  //* Event Listeners:
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearAllItems);
  filterItem.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  CheckUI();
};

init();
