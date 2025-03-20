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

taskFormButton.addEventListener("click", function () {
  // console.log("click");
});

async function initialize() {
  const serverData = await fetchData("departments"); // Wait for data to be fetched
  const priorityData = await fetchData("priorities"); // Wait for data to be fetched
  const statusData = await fetchData("statuses"); // Wait for data to be fetched

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
}
initialize();

departmentsDropDown.addEventListener("change", function () {
  let value = this.value;
  async function initialize() {
    const serverData = await fetchData("employees"); // Wait for data to be fetched

    console.log(serverData);

    if (serverData) {
      const filteredData = serverData.filter(
        (item) => item.department.id == value
      );

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
      // console.log(titleInput.value);
      formData.set("name", titleInput.value);
      // console.log(formData);
    }
  });

  departmentsDropDown.addEventListener("change", function () {
    if (departmentsDropDown.value === "#") {
      isValid = false;
    } else {
      // dropdownError.textContent = "";
      // dropdownError.style.cssText = green;
      formData.set("department", departmentsDropDown.value);
    }
  });

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
    }
  });

  employeeDropDownEl.addEventListener("change", function () {
    if (employeeDropDownEl.value === "#") {
      isValid = false;
    } else {
      // dropdownError.textContent = "";
      // dropdownError.style.cssText = green;
      formData.set("employee_id", employeeDropDownEl.value);
    }
  });

  // priorityDropDown.addEventListener("change", function () {
  //   if (priorityDropDown.value === "#") {
  //     isValid = false;
  //   } else {
  //     // dropdownError.textContent = "";
  //     // dropdownError.style.cssText = green;
  //     formData.set("priority_id", priorityDropDown.value);
  //   }
  // });

  function validatePriority() {
    if (priorityDropDown.value === "#") {
      isValid = false;
    } else {
      formData.set("priority_id", priorityDropDown.value);
    }
  }
  validatePriority();
  priorityDropDown.addEventListener("change", validatePriority());

  // statusDropDown.addEventListener("change", function () {
  //   if (statusDropDown.value === "#") {
  //     isValid = false;
  //   } else {
  //     // dropdownError.textContent = "";
  //     // dropdownError.style.cssText = green;
  //     formData.set("status_id", statusDropDown.value);
  //   }
  // });

  function validateStatus() {
    if (statusDropDown.value === "#") {
      isValid = false;
    } else {
      formData.set("status_id", statusDropDown.value);
    }
  }
  validateStatus();
  statusDropDown.addEventListener("change", validateStatus);

  // dateInput.addEventListener("change", function () {
  //   if (!dateInput.value) {
  //     isValid = false;
  //     console.log("should be empty");
  //   } else {
  //     // dropdownError.textContent = "";
  //     // dropdownError.style.cssText = green;
  //     formData.set("due_date", dateInput.value);
  //   }
  // });

  function validateDate() {
    if (!dateInput.value) {
      isValid = false;
      console.log("should be empty");
    } else {
      formData.set("due_date", dateInput.value);
    }
  }
  validateDate();
  dateInput.addEventListener("change", validateDate());

  return isValid;
}

validationNewTask();

document
  .querySelector(".task-form-btn")
  .addEventListener("click", function (e) {
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
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  });
