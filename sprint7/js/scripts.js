const API_KEY = "c3dddb9e82bdaadead26cd3f0d27e0e3";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const messageEl = document.getElementById("message");
const weatherCard = document.getElementById("weather-card");
const backBtn = document.getElementById("back-btn");

const cityNameEl = document.getElementById("city-name");
const currentDateEl = document.getElementById("current-date");
const weatherIconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  await searchWeather(city);
});

backBtn.addEventListener("click", () => {
  weatherCard.classList.add("hide");
  showMessage("");
  cityInput.value = "";
  cityInput.focus();
});

async function searchWeather(city) {
  showMessage("Buscando...");
  weatherCard.classList.add("hide");

  try {
    const weatherData = await fetchWeather(city);
    renderWeather(weatherData);
    showMessage("");
  } catch (error) {
    showMessage(error.message);
  }
}

async function fetchWeather(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=pt_br`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error("Cidade não encontrada. Verifique o nome digitado.");
  }
  if (response.status === 401) {
    throw new Error("Chave da API inválida. Confira a API_KEY em js/scripts.js.");
  }
  if (!response.ok) {
    throw new Error("Não foi possível buscar o clima agora. Tente novamente.");
  }

  return response.json();
}

function renderWeather(data) {
  const weather = data.weather[0];

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  currentDateEl.textContent = formatDate(new Date());

  weatherIconEl.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  weatherIconEl.alt = weather.description;

  temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionEl.textContent = weather.description;

  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windEl.textContent = `${data.wind.speed} m/s`;

  weatherCard.classList.remove("hide");
}

function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function showMessage(text) {
  messageEl.textContent = text;
}
