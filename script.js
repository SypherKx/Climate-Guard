// 🌿 Search functionality
const search = document.getElementById("searchInput");
const plants = document.querySelectorAll(".plant");

search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase();
  plants.forEach((p) => {
    p.style.display = p.textContent.toUpperCase().includes(term)
      ? "block"
      : "none";
  });
});

// 🌦 Weather functionality
const apiKey = "73e91e38b6c4a51842afb1ff58c968e5"; // <-- Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML =
      "<span class='error'>Please enter a city name.</span>";
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data.cod !== 200) {
      resultDiv.innerHTML = `<span class='error'>${data.message}</span>`;
      return;
    }

    resultDiv.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>🌥 Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<span class='error'>Error fetching weather. ${error.message}</span>`;
  }
}
