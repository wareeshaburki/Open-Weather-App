const cityName = document.querySelector(".city-input");
const temperatureType = document.querySelector(".temperature-type-select");
const tempPara = document.querySelector(".final-output .temp");
const tempdes = document.querySelector(".final-output .desc");
const temphumidity = document.querySelector(".final-output .humidity");
const tempwind = document.querySelector(".final-output .wind");
const weatherIcon = document.querySelector(".final-output .icon");
const button = document.querySelector(".show-temp-button");
const apiKey = "c6e1d5074429a6b219d1076858ffb757";
const base_url = `https://api.openweathermap.org/data/2.5/weather?q=`;

button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  if (cityName.value === "") {
    tempPara.textContent = "Enter a valid city name";
    return;
  }
  const city = cityName.value.trim();
  const unit = temperatureType.value === "celsius" ? "metric" : "imperial";
  const url = `${base_url}${city}&appid=${apiKey}&units=${unit}`;
  tempPara.textContent = "Loading...";
  tempdes.textContent = "";
  temphumidity.textContent = "";
  tempwind.textContent = "";
  weatherIcon.src = "";
  weatherIcon.alt = "";
  let response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    let temperature = data.main.temp;
    let description = data.weather[0].description;
    let humidity = data.main.humidity;
    let wind = data.wind.speed;
    tempPara.textContent = `${temperature}° ${unit === "metric" ? "C" : "F"}`;
    tempdes.textContent = `Description : ${description}`;
    temphumidity.textContent = `Humidity : ${humidity}%`;
    tempwind.textContent = `Wind Speed : ${wind} ${
      unit === "metric" ? "m/s" : "mph"
    }`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = description;
  } else {
    tempPara.textContent = "City Not Found";
    tempdes.textContent = "";
    temphumidity.textContent = "";
    tempwind.textContent = "";
    weatherIcon.src = "";
    weatherIcon.alt = "";
  }
});
