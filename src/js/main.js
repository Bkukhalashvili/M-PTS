// Get modal elements
const modalOverlay = document.querySelector(".modal-overlay");
const openModalBtn = document.querySelector(".nav__btn");
// const closeModalBtn = document.querySelector(".modal-btn--cancel");
const closeModalBtn = document.querySelectorAll(".modal-btn--cancel");
const departmentDropDown = document.getElementById("departments");

import { validationForModal } from "./validation.js"; //testing
import { fetchDepartment } from "./taskAPI.js"; //testing
import { dynamicDropDown } from "./taskAPI.js"; //testing

// Open modal on button click and fetch & display departments data
openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex"; // Show the modal
  validationForModal();

  async function initialize() {
    const departmentData = await fetchDepartment(); // Wait for data to be fetched
    if (departmentData) {
      for (let i = 0; i < departmentData.length; i++) {
        dynamicDropDown(departmentData, departmentDropDown);
      }
    }
  }
  // initialize();
});

// Close modal on button click
// closeModalBtn.addEventListener("click", () => {
//   modalOverlay.style.display = "none"; // Hide the modal
//   console.log("clicked");
// });

for (let i = 0; i < closeModalBtn.length; i++) {
  closeModalBtn[i].addEventListener("click", function () {
    modalOverlay.style.display = "none";

    document.querySelector(".employee-form").reset();
  });
}

// Optionally, close modal if clicking outside the modal
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none"; // Hide the modal when clicking outside
    console.log("clicked");
  }
});

// filter

document.querySelectorAll(".dropdown-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevents closing when clicking inside dropdown

    // Close all other dropdowns first
    document.querySelectorAll(".dropdown-content").forEach((content) => {
      if (content !== this.nextElementSibling) {
        content.style.display = "none";
      }
    });

    // Toggle the current dropdown
    let dropdown = this.nextElementSibling;
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", function () {
  document.querySelectorAll(".dropdown-content").forEach((content) => {
    content.style.display = "none";
  });
});

// Prevent dropdown from closing when clicking inside ((
document.querySelectorAll(".dropdown-content").forEach((content) => {
  content.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents closing when clicking inside dropdown
  });
});
