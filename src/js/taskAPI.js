import { API_URL, TOKEN } from "./config.js";

async function fetchTasks() {
  let toDoEL = document.querySelector(".to-do");
  let progressEl = document.querySelector(".progress");
  let readyEl = document.querySelector(".ready");
  let completedEl = document.querySelector(".completed");
  console.log(`${TOKEN}`);
  try {
    const response = await fetch(`${API_URL}${"tasks"}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.json();

    // dynamic html for cards

    data.forEach((item) => {
      // departments
      const departmentNames = {
        1: "ადმინისტრაცია",
        2: "ადამიანური რესურსები",
        3: "ფინანსები",
        4: "მარკეტინგი",
        5: "ლოჯისტიკა",
        6: "ინფ.ტექ",
        7: "მედია",
      };

      const department = item.department.id;

      const departmentName =
        departmentNames[department] || "Invalid department";

      // which column should task go
      const statusMessages = {
        1: toDoEL,
        2: progressEl,
        3: readyEl,
        4: completedEl,
      };
      const status = item.status.id;

      const statusMessage = statusMessages[status] || "Invalid status";

      statusMessage.innerHTML += `
              <div class="card card__status--${item.status.id}" id = "${
        item.id
      }">
              <div class="card__info">
                <div class="card__info__priority card__info__priority--${
                  item.priority.id
                }">
                  <img class="priority__icon" src="${item.priority.icon}"" />
                  <p class="priority-text">
                  ${item.priority.name}
                  </p>
                </div>

                <div class="card__info__department card__info__department--${
                  item.department.id
                }">
                  <p class="department-text">
                  ${departmentName}

                  </p>
                </div>

                <div class="card__info__date">
                  <p class="card-date">
                  ${item.due_date.split("T")[0]}
                  </p>
                </div>
              </div>
              <div class="card__description">
                <p class="card__description__title">
                ${item.name}
                </p>
                <p class="card__description__content">
                ${item.description}
                </p>
              </div>
              <div class="card__employee">
                <!-- <div class="card__employee_"> -->
                  <img class="card__employee__img" src="${
                    item.employee.avatar
                  }" alt="" />

                <!-- </div> -->
                <div class="card__comments">
                  <img class="card__comments__icon" src="../src/img/comments-icon.svg" alt="" />
                  <p class="card__comment__num"> 8</p>

                </div>
              </div>
            </div>
        `;
    });

    const cardEl = document.querySelectorAll(".card");

    cardEl.forEach((card) => {
      card.addEventListener("click", function () {
        const cardId = this.getAttribute("id");
        // console.log(cardId);
        window.location.href = `card-info.html?id=${cardId}`;
      });
    });

    // console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTasks();

let j = 0;

// creates dynamic dorpdown menu from api data
export function dynamicDropDown(data, selectTag) {
  var option = document.createElement("option");
  option.value = data[j].id;
  option.text = data[j].name;
  selectTag.appendChild(option);
  j++;
}

// fetches a list of all positions
export async function fetchDepartment() {
  try {
    const responseDepartment = await fetch(`${API_URL}${"departments"}`);
    const data = await responseDepartment.json();

    console.log("started");
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// fetchDepartment();

// // displays fetched list of all teams in dynamicly created dorpdown menu
// const displayTeams = teams => {
//   for (i = 0; i < teams.length ; i++) {
//       dynamicDropDown (teams, selectTeams)
//   }
// }

// fetches any data
export async function fetchData(resource) {
  try {
    const response = await fetch(`${API_URL}${resource}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    const data = await response.json();

    // console.log("started");\
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

let value = 1;
let g = 0;
let p = 0;
// creates dynamic dorpdown menu from api data
export function employeeDropDown(data, selectTag) {
  var option = document.createElement("option");
  option.value = value++;
  option.text = `${data[p].name} ${data[p].surname}`;
  selectTag.appendChild(option);
  p++;
  // console.log(test0);
}

export function dynPriorityDropDown(data, selectTag) {
  // console.log(g);
  // console.log(data);
  var option = document.createElement("option");
  option.value = data[g].id;
  option.text = data[g].name;
  selectTag.appendChild(option);
  g++;
  // console.log(test0);
}

console.log(g);
let k = 0;
export function dynStatusDropDown(data, selectTag) {
  // console.log(g);
  // console.log(data[3]);
  var option = document.createElement("option");
  option.value = data[k].id;
  option.text = data[k].name;
  selectTag.appendChild(option);
  k++;
  // console.log(test0);
}
