import { API_URL, TOKEN } from "./config.js";

const regex = {
  GeorgianLatin: /^[ა-ჰa-zA-Z]+$/, // Georgian & Latin letters,
  numRange: /^.{2,255}$/, // 2-255 characters
};

// to give color to the images
const green =
  "filter: invert(45%) sepia(57%) saturate(6079%) hue-rotate(100deg) brightness(102%) contrast(94%)";
const red =
  "filter: invert(62%) sepia(87%) saturate(3809%) hue-rotate(327deg) brightness(98%) contrast(113%)";
const grey =
  "filter: invert(46%) sepia(12%) saturate(366%) hue-rotate(167deg) brightness(95%) contrast(83%)";

// Create FormData object (this gets uploaded to the server)
const formData = new FormData();

export function validationForModal() {
  const nameInput = document.getElementById("name");
  const nameErrorOne = document.getElementById("nameError-1");
  const nameErrorTwo = document.getElementById("nameError-2");
  const surnameInput = document.getElementById("surname");
  const surnameErrorOne = document.getElementById("surnameError-1");
  const surnameErrorTwo = document.getElementById("surnameError-2");
  const imageInput = document.getElementById("avatarInput");
  const dropdownInput = document.getElementById("departments");

  // Helps to validate the whole form
  let isValid = true;

  // Name validation
  function validateName() {
    const nameValue = nameInput.value;
    console.log(nameValue);

    if (!nameValue.match(regex.GeorgianLatin)) {
      nameErrorOne.style.cssText = grey;
      nameErrorTwo.style.cssText = grey;

      isValid = false;
    } else if (!nameValue.match(regex.numRange)) {
      nameErrorOne.style.cssText = red;
      nameErrorTwo.style.cssText = red;
      isValid = false;
    } else {
      nameErrorOne.style.cssText = green;
      nameErrorTwo.style.cssText = green;
      formData.set("name", nameInput.value);
    }
  }

  validateName();
  nameInput.addEventListener("input", validateName);

  // Surname validation
  function validateSurname() {
    const surnameValue = surnameInput.value;

    if (!surnameValue.match(regex.GeorgianLatin)) {
      surnameErrorOne.style.cssText = grey;
      surnameErrorTwo.style.cssText = grey;
      isValid = false;
    } else if (!surnameValue.match(regex.numRange)) {
      surnameErrorOne.style.cssText = red;
      surnameErrorTwo.style.cssText = red;
      isValid = false;
    } else {
      surnameErrorOne.style.cssText = green;
      surnameErrorTwo.style.cssText = green;
      formData.set("surname", surnameInput.value);
    }
  }

  validateSurname();
  surnameInput.addEventListener("input", validateSurname);

  // Image validation
  function validateImage() {
    const file = imageInput.files[0];

    if (!file) {
      isValid = false;
      return;
    }

    if (!file.type.startsWith("image/")) {
      imageInput.style.borderColor = "red";
      isValid = false;

      return;
    }

    if (file.size > 600 * 1024) {
      imageInput.style.borderColor = "red";
      isValid = false;

      return;
    }
    imageInput.style.borderColor = "#ced4da";
    formData.set("avatar", imageInput.files[0]);
  }

  validateImage();
  imageInput.addEventListener("change", validateImage);

  // Dropdown validation
  function validateDropdown() {
    if (dropdownInput.value === "#") {
      isValid = false;
    } else {
      formData.set("department_id", dropdownInput.value);
    }
  }

  validateDropdown();
  imageInput.addEventListener("change", validateDropdown);

  // returns the answer if all fields passed the validation
  return isValid;
}

document
  .querySelector(".modal-btn--add-emp")
  .addEventListener("click", function () {
    // checks if form passed the validation and uploads the data
    if (validationForModal()) {
      const endpoint = "https://momentum.redberryinternship.ge/api/employees";

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
          modal;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
