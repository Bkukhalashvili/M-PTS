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
