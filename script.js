const apiKey = '4b5d8970563fd331b855a8219beb9f42'; // Replace with your own API key from OpenWeatherMap
const weatherInfoDiv = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');
const fetchWeatherButton = document.getElementById('fetchWeather');

fetchWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    if (data.cod !== 200) {
        alert('Location not found');
        return;
    }

    const { name, main, weather, wind } = data;
    const { temp, feels_like, humidity } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" class="weather-icon">
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Feels Like:</strong> ${feels_like}°C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${speed} m/s</p>
    `;
    weatherInfoDiv.classList.add('active');
}

// Optionally, fetch weather data based on user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    });
}
