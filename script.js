const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const filterItem = document.getElementById("filter");

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

// * REMOVE ITEMS:
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      CheckUI();
    }
  }
};

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  CheckUI();
};

//* Remove the filter field and clear button when no item exists:
const CheckUI = () => {
  const item = document.querySelectorAll("li");

  if (item.length === 0) {
    filterItem.style.display = "none";
    clearButton.style.display = "none";
  } else {
    filterItem.style.display = "block";
    clearButton.style.display = "block";
  }

  return;
};

//* Event Listeners:
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearAllItems);

CheckUI();
