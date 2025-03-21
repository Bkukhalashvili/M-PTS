import { API_URL, TOKEN } from "./config.js";
import {
  fetchData,
  dynamicDropDown,
  employeeDropDown,
  dynPriorityDropDown,
  dynStatusDropDown,
} from "./taskAPI.js";

const taskFormButton = document.querySelector(".task-form-btn");
const employeeDropDownEl = document.getElementById("employee");
const departmentsDropDown = document.getElementById("departments");
const priorityDropDown = document.getElementById("priority");
const statusDropDown = document.getElementById("status");
const dateInput = document.getElementById("deadline");

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");

async function initialize() {
  const serverData = await fetchData("departments");
  const priorityData = await fetchData("priorities");
  const statusData = await fetchData("statuses");

  // gets dynamic dropdown function from taskAPI
  // and creates department, priority and status dropdown menu
  if (serverData) {
    for (let i = 0; i < serverData.length; i++) {
      dynamicDropDown(serverData, departmentsDropDown);
    }
  }
  if (priorityData) {
    for (let i = 0; i < priorityData.length; i++) {
      dynPriorityDropDown(priorityData, priorityDropDown);
    }

    priorityDropDown.value = "2";
  }
  if (statusData) {
    for (let i = 0; i < statusData.length; i++) {
      dynStatusDropDown(statusData, statusDropDown);
      statusDropDown.value = "1";
    }
  }
  localStorage.setItem("status_id", statusDropDown.value);
  localStorage.setItem("priority_id", priorityDropDown.value);
}
initialize();

// function loadFormData() {
//   if (localStorage.getItem("name")) {
//     titleInput.value = localStorage.getItem("name");
//   }
//   if (localStorage.getItem("department")) {
//     // departmentsDropDown.value = localStorage.getItem("department");
//   }
//   if (localStorage.getItem("description")) {
//     descriptionInput.value = localStorage.getItem("description");
//   }
//   if (localStorage.getItem("employee_id")) {
//     employeeDropDownEl.value = localStorage.getItem("employee_id");
//   }
//   if (localStorage.getItem("priority_id")) {
//     priorityDropDown.value = localStorage.getItem("priority_id");
//   }
//   if (localStorage.getItem("status_id")) {
//     statusDropDown.value = localStorage.getItem("status_id");
//   }
//   if (localStorage.getItem("due_date")) {
//     dateInput.value = localStorage.getItem("due_date");
//   }
// }
// loadFormData();

// disables employee dropdown before departments isnt selected
employeeDropDownEl.disabled = true;
employeeDropDownEl.classList.add("disabled-select");

departmentsDropDown.addEventListener("change", function () {
  let value = this.value;

  // for employees dropdown
  if (value !== "#") {
    employeeDropDownEl.disabled = false;
    employeeDropDownEl.classList.remove("disabled-select");
    // employeeDropDownEl.innerHTML = `<option value="#" disabled selected hidden></option>`;
  } else {
    employeeDropDownEl.disabled = true;
    employeeDropDownEl.classList.add("disabled-select");
  }

  async function initialize() {
    // employeeDropDownEl.innerHTML = `<option value="#" disabled selected hidden></option>`;

    const serverData = await fetchData("employees");

    console.log(serverData);

    if (serverData) {
      const filteredData = serverData.filter(
        (item) => item.department.id == value
      );
      console.log(value);
      for (let i = 0; i < filteredData.length; i++) {
        employeeDropDown(filteredData, employeeDropDownEl);
      }
    }
  }
  initialize();
});

// calendar
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const todayString = today.toISOString().split("T")[0];
const tomorrowString = tomorrow.toISOString().split("T")[0];
dateInput.value = tomorrowString;
dateInput.min = todayString;

// validation

const regex = {
  numRange: /^.{3,255}$/, // Minimum 3 characters, maximum 255 characters:
  wordRange: /^(?:\S+\s+){3,}\S{1,255}$/, // Minimum 4 words, maximum 255 characters:
};

const formData = new FormData();

function validationNewTask() {
  const titleInput = document.getElementById("title");
  // const departmentInput = document.getElementById("department");
  const descriptionInput = document.getElementById("description");
  const titleErrorOne = document.getElementById("titleError-1");
  const titleErrorTwo = document.getElementById("titleError-2");
  const descriptionErrorOne = document.getElementById("descriptionError-1");
  const descriptionErrorTwo = document.getElementById("descriptionError-2");

  let isValid = true;

  // function validateTitle() {
  //   const titleValue = titleInput.value;

  //   if (!titleValue.match(regex.numRange)) {
  //     titleErrorOne.style.cssText = "color: red";
  //     titleErrorTwo.style.cssText = "color: red";
  //     isValid = false;
  //   } else if (titleValue == "") {
  //     // titleErrorOne.style.cssText = "color: grey";
  //     // titleErrorTwo.style.cssText = "color: grey";
  //     isValid = false;
  //   } else {
  //     titleErrorOne.style.cssText = "color: green";
  //     titleErrorTwo.style.cssText = "color: green";
  //     // console.log(titleInput.value);
  //     formData.set("name", titleInput.value);
  //     // console.log(formData);
  //   }
  // }
  // validateTitle();

  // titleInput.addEventListener("change", validateTitle);

  // validate title

  titleInput.addEventListener("input", function () {
    const titleValue = titleInput.value;

    if (!titleValue.match(regex.numRange)) {
      titleErrorOne.style.cssText = "color: red";
      titleErrorTwo.style.cssText = "color: red";
      isValid = false;
    } else if (titleValue == "") {
      titleErrorOne.style.cssText = "color: red";
      titleErrorTwo.style.cssText = "color: red";
      isValid = false;
    } else {
      titleErrorOne.style.cssText = "color: green";
      titleErrorTwo.style.cssText = "color: green";
      formData.set("name", titleInput.value);
      localStorage.setItem("name", titleInput.value);
    }
  });

  // validate department dropdown
  function validateDepartmentsDropdown() {
    if (departmentsDropDown.value === "#") {
      isValid = false;
    } else {
      // dropdownError.textContent = "";
      // dropdownError.style.cssText = green;
      formData.set("department", departmentsDropDown.value);
      localStorage.setItem("department", departmentsDropDown.value);
    }
  }
  validateDepartmentsDropdown();
  departmentsDropDown.addEventListener("change", validateDepartmentsDropdown);

  // function validateDescription() {
  //   const descriptionValue = descriptionInput.value;

  //   if (!descriptionValue.match(regex.wordRange)) {
  //     descriptionErrorOne.style.cssText = "color: red";
  //     descriptionErrorTwo.style.cssText = "color: red";
  //     isValid = false;
  //   } else {
  //     descriptionErrorOne.style.cssText = "color: green";
  //     descriptionErrorTwo.style.cssText = "color: green";

  //     formData.set("description", descriptionInput.value);
  //   }
  // }
  // validateDescription();
  // descriptionInput.addEventListener("change", validateDescription);

  // validate Description
  descriptionInput.addEventListener("input", function () {
    const descriptionValue = descriptionInput.value;

    if (!descriptionValue.match(regex.wordRange)) {
      descriptionErrorOne.style.cssText = "color: red";
      descriptionErrorTwo.style.cssText = "color: red";
      isValid = false;
    } else {
      descriptionErrorOne.style.cssText = "color: green";
      descriptionErrorTwo.style.cssText = "color: green";

      formData.set("description", descriptionInput.value);
      localStorage.setItem("description", descriptionInput.value);
    }
  });

  // validate employee dropdown
  function validateEmpDropdown() {
    if (employeeDropDownEl.value === "#") {
      isValid = false;
    } else {
      console.log("success");
      formData.set("employee_id", employeeDropDownEl.value);
      localStorage.setItem("employee_id", employeeDropDownEl.value);
    }
  }

  validateEmpDropdown();
  employeeDropDownEl.addEventListener("change", validateEmpDropdown);

  // Validate Priority
  function validatePriority() {
    if (priorityDropDown.value === "#") {
      isValid = false;
    } else {
      formData.set("priority_id", priorityDropDown.value);
      localStorage.setItem("priority_id", priorityDropDown.value);
    }
  }
  validatePriority();
  priorityDropDown.addEventListener("change", validatePriority);

  // Validate Status
  function validateStatus() {
    console.log(statusDropDown.value);

    if (statusDropDown.value === "#") {
      isValid = false;
    } else {
      formData.set("status_id", statusDropDown.value);
      localStorage.setItem("status_id", statusDropDown.value);
    }
  }
  validateStatus();
  statusDropDown.addEventListener("change", validateStatus);

  // Validate date
  function validateDate() {
    if (!dateInput.value) {
      isValid = false;
      console.log("should be empty");
    } else {
      formData.set("due_date", dateInput.value);
      localStorage.setItem("due_date", dateInput.value);
    }
  }
  validateDate();
  dateInput.addEventListener("change", validateDate);

  return isValid;
}

validationNewTask();

taskFormButton.addEventListener("click", function () {
  if (validationNewTask()) {
    // // console.log("readyy");
    const endpoint = "https://momentum.redberryinternship.ge/api/tasks";

    fetch(endpoint, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(function (text) {
        console.log(text);
      })
      .then((data) => {
        console.log("Upload Successful:", data);
        window.location.href = "index.html"; // Redirect after successful upload
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    console.log("here");
  }

  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
});
