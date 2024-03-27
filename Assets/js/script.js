//Add in the UTC plugin for dayjs
dayjs.extend(window.dayjs_plugin_utc);

//Selectors
const buttonEl = document.querySelector("#search");
const inputEl = document.querySelector("#city");
const todayEl = document.querySelector("#today");
const forecastEl = document.querySelector("#forecast");

//Vars
const API_KEY = "57693c20cc9de93006be32fd645ff9bb";
const todayDate = dayjs().utc().format("D");

//Get the coordinates of the city entered
const getCoordinates = (city) => {
  let cityName = city.toLowerCase();
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getWeather(data[0].lat, data[0].lon);
    });
};

//Get the weather data from API
const getWeather = async (lat, lon) => {
  if (lat !== undefined && lon !== undefined) {
    let todayArr = [];
    let forecastArr = [];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    fetch(weatherUrl, {
      mode: "cors",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        data.list.map((dt) => {
          //map through data to get todays data & save in array
          const dateObj = dayjs.unix(dt.dt).format();
          let date = dayjs.utc(dateObj).format("D");
          let hour = dayjs.utc(dateObj).format("H");
          if (date === todayDate) {
            todayArr.push(dt);
          }
          //getting the rest of the dates & save in array
          if (date != todayDate) {
            //Using the same time for each forecast. 5th day only shows midnight
            if (hour == 0) {
              forecastArr.push(dt);
            }
          }
        });
        //Create the elements with the data
        makeTodayWeather(todayArr);
        makeForecast(forecastArr);
      });
  }
};

//Makes the top element showing todays weather
const makeTodayWeather = (todayData) => {
  if (todayData.length != 0) {
    //Create the title
    const dateObj = dayjs.unix(todayData[0].dt).format();
    const title = document.createElement("div");
    title.className = "today-title";
    const cityTitle = document.createElement("h3");
    cityTitle.textContent = `${inputEl.value} (${dayjs.utc(dateObj).format("DD/MM/YYYY")})`;
    const icon = document.createElement("img");
    icon.className = "weather-icon";
    icon.src = `http://openweathermap.org/img/w/${todayData[0].weather[0].icon}.png`;
    title.append(cityTitle, icon);

    //Create the details
    const temp = document.createElement("p");
    const wind = document.createElement("p");
    const hum = document.createElement("p");
    temp.textContent = `Temp: ${todayData[0].main.temp} °F`;
    wind.textContent = `Wind: ${todayData[0].wind.speed} MPH`;
    hum.textContent = `Humidity: ${todayData[0].main.humidity} %`;

    //Append to today div
    todayEl.append(title, temp, wind, hum);
    todayEl.className = "add-border";
  }
};

//Makes the lower element showing the 5 day forecast
const makeForecast = (forecastData) => {
  console.log(forecastData);
  const fTitle = document.createElement("h4");
  fTitle.textContent = "5-Day Forecast:";
  const fData = document.createElement("div");
  fData.className = "forecast-wrapper";
  //Map through each array object to create the forecast
  forecastData.map((data) => {
    const dateObj = dayjs.unix(data.dt).format();
    const singleDay = document.createElement("div");
    let date = document.createElement("h5");
    let icon = document.createElement("img");
    const temp = document.createElement("p");
    const wind = document.createElement("p");
    const hum = document.createElement("p");

    //Create each forecast box
    date.textContent = dayjs.utc(dateObj).format("DD/MM/YYYY");
    icon.className = "weather-icon";
    icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    temp.textContent = `Temp: ${data.main.temp} °F`;
    wind.textContent = `Wind: ${data.wind.speed} MPH`;
    hum.textContent = `Humidity: ${data.main.humidity} %`;

    singleDay.append(date, icon, temp, wind, hum);
    fData.append(singleDay);
  });
  //Append to Forecast div
  forecastEl.append(fTitle, fData);
};

//Add event listener to the search button & call function
buttonEl.addEventListener("click", () => {
  const city = inputEl.value;
  getCoordinates(city);
});
