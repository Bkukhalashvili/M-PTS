import { API_URL, TOKEN } from "./config.js";

const regex = {
  GeorgianLatin: /^[ა-ჰa-zA-Z]+$/, // Georgian & Latin letters,
  numRange: /^.{2,255}$/, // 2-255 characters
};

const green =
  "filter: invert(45%) sepia(57%) saturate(6079%) hue-rotate(100deg) brightness(102%) contrast(94%)";
const red =
  "filter: invert(62%) sepia(87%) saturate(3809%) hue-rotate(327deg) brightness(98%) contrast(113%)";
const grey =
  "filter: invert(46%) sepia(12%) saturate(366%) hue-rotate(167deg) brightness(95%) contrast(83%)";

let testing = "";
// Create FormData object
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

  let isValid = true;

  nameInput.addEventListener("input", function () {
    const nameValue = nameInput.value;

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
  });

  surnameInput.addEventListener("input", function () {
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
  });

  // Image validation
  imageInput.addEventListener("change", function () {
    const file = imageInput.files[0];

    // imageInput.style.border = "#ced4da";

    if (!file) {
      imageInput.style.borderColor = "red";
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

    // console.log("here");
    imageInput.style.borderColor = "#ced4da";
    formData.set("avatar", imageInput.files[0]);

    // imageError.textContent = "";
    // imageError.style.cssText = green;
  });

  // Dropdown validation
  dropdownInput.addEventListener("change", function () {
    if (dropdownInput.value === "#") {
      isValid = false;
    } else {
      // dropdownError.textContent = "";
      // dropdownError.style.cssText = green;
      formData.set("department_id", dropdownInput.value);
    }
  });

  // Form submit handling (for example, you can prevent submit if validation fails)
  // const form = document.getElementById('employeeForm');
  // if (form) {
  //   form.addEventListener('submit', function (e) {
  //     if (nameError.textContent || lastnameError.textContent) {
  //       e.preventDefault(); // Prevent form submission if errors exist
  //     }
  //   });
  // }

  return isValid;
}

document
  .querySelector(".modal-btn--add-emp")
  .addEventListener("click", function (e) {
    if (validationForModal()) {
      // console.log("readyy");
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
        .catch(function (error) {
          console.error(error);
        });
    }

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
  });

// const formData = new FormData();
// formData.append("name", nameInput.value);
// formData.append("surname", surnameInput.value);
// formData.append("department", dropdownMenu.value);
// formData.append("avatar", imageInput.files[0]); // Upload image
