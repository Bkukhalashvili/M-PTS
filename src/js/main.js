// Get modal elements
const modalOverlay = document.querySelector(".modal-overlay");
const openModalBtn = document.querySelector(".nav__btn");
// const closeModalBtn = document.querySelector(".modal-btn--cancel");
const closeModalBtn = document.querySelectorAll(".modal-btn--cancel");

// Open modal on button click
openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex"; // Show the modal
});

// Close modal on button click
// closeModalBtn.addEventListener("click", () => {
//   modalOverlay.style.display = "none"; // Hide the modal
//   console.log("clicked");
// });

for (let i = 0; i < closeModalBtn.length; i++) {
  closeModalBtn[i].addEventListener("click", function () {
    modalOverlay.style.display = "none";
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
