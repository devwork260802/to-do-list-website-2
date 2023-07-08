// Element Selector
const header_time = document.querySelector("[data-header-time]");
const menu_togglers = document.querySelectorAll("[data-menu-toggler]");
const menu = document.querySelector("[data-menu]");
const theme_button = document.querySelectorAll("[data-theme-btn]");
const modal_togglers = document.querySelectorAll("[data-modal-toggler]");
const welcome_note = document.querySelector("[data-welcome-note]");
const task_list = document.querySelector("[data-task-list]");
const task_input = document.querySelector("[data-task-input]");
const modal = document.querySelector("[data-info-modal]");
let task_item = {};
let task_remover = {};

// Current Date
const date = new Date();

// Import Sound
const task_complete_sound = new Audio("../music/task-complete.mp3");

// Date Conversions
const get_week_day_name = function (day_number) {
  switch (day_number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satureday";
    default:
      return "Not a valid day";
  }
};
const get_month_name = function (month_number) {
  switch (month_number) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Not a valid month";
  }
};
const weekDayName = get_week_day_name(date.getDay());
const monthName = get_month_name(date.getMonth());
const monthOfDay = date.getDate();

// Update Header
header_time.textContent = `${weekDayName}, ${monthName} ${monthOfDay}`;

// Active Toggler
const element_toggler = function (elem) {
  elem.classList.toggle("active");
};

// Event Adder
const add_event_on_multi_element = function (elems, event) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", event);
  }
};

// Task
const task_item_node = function (taskText) {
  const create_task_item = document.createElement("li");
  create_task_item.classList.add("task-item");
  create_task_item.setAttribute("data-task-item", "");
  create_task_item.innerHTML = `
    <button class="item-icon" data-task-remove="complete">
      <span class="check-icon"></span>
    </button>
    <p class="item-text">${taskText}</p>
    <button class="item-action-btn" aria-label="Remove task" data-task-remove>
      <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
    </button>
  `;
  return create_task_item;
};

// Task Validation
const task_input_validation = function (task_is_valid) {
  if (task_is_valid) {
    if (task_list.childElementCount > 0) {
      task_list.insertBefore(task_item_node(task_input.value), task_item[0]);
    } else {
      task_list.appendChild(task_item_node(task_input.value));
    }
    task_input.value = "";
    welcome_note.classList.add("hide");
    task_item = document.querySelectorAll("[data-task-item]");
    task_remover = document.querySelectorAll("[data-task-remove]");
  } else {
    console.log("Please write something!");
  }
};
const remove_welcome_note = function () {
  if (task_list.childElementCount > 0) {
    welcome_note.classList.add("hide");
  } else {
    welcome_note.classList.remove("hide");
  }
};

// Task Remover
const removeTask = function () {
  const parent_element = this.parent_element;
  if (this.dataset.taskRemove === "complete") {
    parent_element.classList.add("complete");
    task_complete_sound.play();
    setTimeout(function () {
      parent_element.remove();
      remove_welcome_note();
    }, 250);
  } else {
    parent_element.remove();
    remove_welcome_note();
  }
};

// Task Adder
const add_task = function () {
  task_input_validation(task_input.value);
  add_event_on_multi_element(task_remover, removeTask);
};
task_input.addEventListener("keypress", function (e) {
  switch (e.key) {
    case "Enter":
      add_task();
      break;
  }
});

// Menu Operation
const toggle_menu = function () {
  element_toggler(menu);
};
add_event_on_multi_element(menu_togglers, toggle_menu);

// App Information Modal
const toggle_modal = function () {
  element_toggler(modal);
};
add_event_on_multi_element(modal_togglers, toggle_modal);

// Body Class Adder
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Background Changer
const theme_changer = function () {
  const hue_value = this.dataset.hue;
  document.documentElement.style.setProperty("--hue", hue_value);
  for (let i = 0; i < theme_button.length; i++) {
    if (theme_button[i].classList.contains("active")) {
      theme_button[i].classList.remove("active");
    }
  }
  this.classList.add("active");
};
add_event_on_multi_element(theme_button, theme_changer);
