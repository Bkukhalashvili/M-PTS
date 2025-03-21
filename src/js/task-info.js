import { API_URL, TOKEN } from "./config.js";
import { dynStatusDropDown, fetchData } from "./taskAPI.js";

async function fetchTaskById() {
  const urlParams = new URLSearchParams(window.location.search);
  const cardId = urlParams.get("id");
  const taskInfo = document.querySelector(".task-info");
  console.log(cardId);
  try {
    const response = await fetch(`${API_URL}${"tasks"}/${cardId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // dynamic html for cards

    console.log(data);

    const departmentNames = {
      1: "ადმინისტრაცია",
      2: "ადამიანური რესურსები",
      3: "ფინანსები",
      4: "მარკეტინგი",
      5: "ლოჯისტიკა",
      6: "ინფ.ტექ",
      7: "მედია",
    };

    const departmentName =
      departmentNames[data.department.id] || "Invalid Department";

    console.log(departmentName);

    // loads statuses

    taskInfo.innerHTML += `

    <div class="task-info__title-info">
            <div class="task-info__priority task-info__priority--${data.priority.id}">
              <img
                class="task-info__priority--icon"
                src="${data.priority.icon}"
                alt=""
              />
              <p class="task-info__priority--text">${data.priority.name}</p>
            </div>

            <div class="task-info__department task-info__department--${data.department.id}">
              <p class="task-info__department--text">${departmentName}</p>
            </div>
          </div>
          <p class="task-info__title">${data.name}</p>
          <div class="task-info__description">
            ${data.description}
          </div>
          <div class="task-info__details">
            <p class="task-info__details--title">დავალების დეტალები</p>
            <div class="task-info__details__container">
              <div class="task-info__details--question">
                <ul>
                  <li class="list-txt">
                    <img
                      class="task-info__details--icon"
                      src="../src/img/pie-chart-icon.svg"
                      alt=""
                    />
                    <p class="task-info__priority--text">სტატუსი</p>
                  </li>
                  <li class="list-txt">
                    <img
                      class="task-info__details--icon"
                      src="../src/img/user-icon.svg"
                      alt=""
                    />
                    <p class="task-info__priority--text">თანამშრომელი</p>
                  </li>
                  <li class="list-txt">
                    <img
                      class="task-info__details--icon"
                      src="../src/img/calendar-icon.svg"
                      alt=""
                    />
                    <p class="task-info__priority--text">დავალების</p>
                  </li>
                </ul>
              </div>
              <div class="task-info__details--answer">
                <ul>
                  <li class="list-txt">
                    <select name="status" id="status" required>
                    </select>
                  </li>
                  <li class="list-txt">
                    <img
                      class="task-info__details--img"
                      src="${data.avatar}"
                      alt=""
                    />
                    <div class="task-info__details__employee">
                      <p class="task-info__details__employee--department">
                        ${departmentName}
                      </p>
                      <p class="task-info__details__employee--name">
                      ${data.employee.name} ${data.employee.surname}
                      </p>
                    </div>
                  </li>
                  <li class="list-txt">
                    <p class="task-info__priority--text">${data.due_date}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
    
    `;

    const statusDropDown = document.getElementById("status");
    let dropdownDefaultValue = `${data.status.id}`;

    async function initialize() {
      const statusData = await fetchData("statuses"); // Wait for data to be fetched

      if (statusData) {
        for (let i = 0; i < statusData.length; i++) {
          dynStatusDropDown(statusData, statusDropDown);
          statusDropDown.value = `${data.status.id}`;
        }
      }
    }
    initialize();

    console.log(dropdownDefaultValue);

    document.getElementById("status").addEventListener("change", function () {
      dropdownDefaultValue = statusDropDown.value;

      data.status.id = statusDropDown.value;

      // console.log(JSON.stringify(data));

      console.log(data.status.id);
      console.log("here");

      const endpoint = `https://momentum.redberryinternship.ge/api/tasks/${cardId}`;

      fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_id: data.status.id }),
      })
        .then(function (text) {
          console.log(text);
        })
        .then((data) => {
          console.log("Upload Successful:", data);
          // window.location.href = "index.html"; // Redirect after successful upload
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchTaskById();
