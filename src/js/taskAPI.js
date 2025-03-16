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
              <div class="card">
              <div class="card__info">
                <div class="card__info__priority card__info__priority--${
                  item.priority.id
                }">
                  <img class="priority__icon" src="${item.priority.icon}"" />
                  <p class="priority-text">
                  ${item.priority.name}
                  </p>
                </div>

                <div class="card__info__department">
                  <p class="department-text">
                  ${item.department.name}

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

    // console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTasks();
