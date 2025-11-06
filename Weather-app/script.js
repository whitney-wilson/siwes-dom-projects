const apiKey = "408f7c9f40fff7142d4a99f959720fbd"; 
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherResult = document.getElementById("weather-result");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const extra = document.getElementById("extra");
const iconImg = document.getElementById("icon");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

// Enter key to search
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});
searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  // UI: start loading
  setVisible(loading, true);
  setVisible(error, false);
  setVisible(weatherResult, false);
  setVisible(iconImg, false);

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}` +
      `&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    if (!res.ok) {
      // 404/401/etc.
      const msg = res.status === 404 ? "City not found" : `Request failed (${res.status})`;
      throw new Error(msg);
    }

    const data = await res.json();

    // Fill UI
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    condition.textContent = `Condition: ${capitalize(data.weather[0].description)}`;
    extra.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C • Humidity: ${data.main.humidity}% • Wind: ${Math.round(data.wind.speed)} m/s`;

    // Weather icon
    const iconCode = data.weather[0].icon; // e.g. "04d"
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.alt = data.weather[0].main;
    setVisible(iconImg, true);

    // UI: show result
    setVisible(weatherResult, true);
    setVisible(error, false);
  } catch (err) {
    error.textContent = err.message || "Something went wrong";
    setVisible(error, true);
    setVisible(weatherResult, false);
  } finally {
    setVisible(loading, false);
  }
}

// Helpers
function setVisible(el, on) {
  el.classList.toggle("hidden", !on);
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
