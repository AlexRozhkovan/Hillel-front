const dateSelect = document.getElementById("date-select");

const getWindDirection = (degrees) => {
  const WIND_DIRECTIONS = [
    "Північний",
    "Північно-східний",
    "Східний",
    "Південно-східний",
    "Південний",
    "Південно-західний",
    "Західний",
    "Північно-західний",
  ];
  const degreePerDirection = 360 / WIND_DIRECTIONS.length;
  let index = Math.floor(degrees / degreePerDirection) % WIND_DIRECTIONS.length;
  return WIND_DIRECTIONS[index > 0 ? index : index + 1];
};

const displayCurrentWeather = (data) => {
  const { temp, pressure, humidity } = data.main;
  const { description, icon } = data.weather[0];
  const { speed, deg } = data.wind;
  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  document.getElementById("weather-info").innerHTML = `
  <div><img src="${iconUrl}" alt="Weather Icon"></div>
  <div>Температура: ${temp}°C</div>
  <div>Тиск: ${(pressure * 0.75006375541921).toFixed(0)} мм рт. ст.</div>
  <div>Опис: ${description}</div>
  <div>Вологість: ${humidity}%</div>
  <div>Швидкість вітру: ${speed}м/с</div>
  <div>Напрям вітру: ${getWindDirection(deg)}</div>
`;
};

const displayWeatherTable = (data) => {
  const selectedDate = new Date(dateSelect.value);
  const filteredData = data.list.filter((item) => {
    const itemDate = new Date(item.dt_txt);
    return (
      itemDate.getDate() === selectedDate.getDate() &&
      itemDate.getHours() % 3 === 0
    );
  });

  document.getElementById("weather-table").innerHTML = `
  <table>
    <tr>
      <th>Час</th>
      <th>Температура (°C)</th>
      <th>Тиск (мм рт. ст.)</th>
      <th>Опис</th>
      <th>Вологість (%)</th>
      <th>Швидкість вітру (м/c)</th>
      <th>Напрям вітру</th>
    </tr>
    ${filteredData
      .map(
        (item) => `
          <tr>
            <td>${new Date(item.dt_txt).toLocaleString("uk-UA", {
              hour: "2-digit",
              minute: "2-digit",
            })}</td>
            <td>${item.main.temp}</td>
            <td>${(item.main.pressure * 0.75006375541921).toFixed(0)}</td>
            <td>${item.weather[0].description}</td>
            <td>${item.main.humidity}</td>
            <td>${item.wind.speed}</td>
            <td>${getWindDirection(item.wind.deg)}</td>
          </tr>
        `
      )
      .join("")}
  </table>
`;
};

const getWeatherData = () => {
  const APPID = "5d066958a60d315387d9492393935c19";
  const citySelect = document.getElementById("city-select");
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${citySelect.value}&lang=ua&units=metric&APPID=${APPID}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Помилка отримання погодних даних. Статус: ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      displayCurrentWeather(data.list[0]);
      displayWeatherTable(data);
      citySelect.addEventListener("change", getWeatherData);
      dateSelect.addEventListener("change", getWeatherData);
    })
    .catch((error) => {
      console.log(error);
    });
};

const populateDateSelect = () => {
  const dates = [];
  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  dateSelect.innerHTML = dates
    .map(
      (date) =>
        `<option value="${
          date.toISOString().split("T")[0]
        }">${date.toLocaleDateString("uk-UA")}</option>`
    )
    .join("");
};

populateDateSelect();
getWeatherData();
