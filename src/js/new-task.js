import { API_URL, TOKEN } from "./config.js";
import { fetchData, dynamicDropDown, employeeDropDown } from "./taskAPI.js";

const taskFormButton = document.querySelector(".task-form-btn");
const employeeDropDownEl = document.getElementById("employee");
const departmentsDropDown = document.getElementById("departments");

taskFormButton.addEventListener("click", function () {
  // console.log("click");
});

async function initialize() {
  const serverData = await fetchData("departments"); // Wait for data to be fetched

  if (serverData) {
    for (let i = 0; i < serverData.length; i++) {
      dynamicDropDown(serverData, departmentsDropDown);
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
