const apiKey = 'ef8743cab46a8d9dba624043e120f77a'; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Fetching weather data from OpenWeather API
async function getWeatherData(city) {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return response.json();
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

// Function to display the current weather data
function displayCurrentWeather(data) {
    const city = data.city.name;
    const date = new Date(data.list[0].dt * 1000).toLocaleDateString();
    const iconCode = data.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    const temperature = data.list[0].main.temp;
    //Converting temperature from Kelvin to Celsius
    const temperatureCelsius = (temperature - 273.15).toFixed(2);
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;

    //Rendering card for current weather of chosen city
    const currentWeatherSection = document.getElementById('current-weather');
    currentWeatherSection.innerHTML = `
        <div class="card">
            <h2>Current Weather</h2>
            <div class="card-body">
                <h5 class="card-title">${city} - ${date}</h5>
                <img src="${iconUrl}" alt="Weather Icon">
                <p class="card-text">Temperature: ${temperatureCelsius} &#8451;</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
            </div>
        </div>
    `;
}


// Function to display the 5-day forecast as cards
function displayForecast(data) {
    const forecastList = data.list;
    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = `<h2>5-Day Forecast</h2>`;
    const currentDate = new Date();
    // Displaying the forecast for the following five days
    for (let i = 1; i <= 5; i++) {
        const forecast = forecastList[i];
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const temperature = forecast.main.temp;
        //Converting temp from Kelvin to Celsius
        const temperatureCelsius = (temperature - 273.15).toFixed(2);
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        // Creating a forecast card and appending it to the forecast section
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('card', 'mb-3');
        forecastCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${date.toLocaleDateString()}</h5>
                <img src="${iconUrl}" alt="Weather Icon">
                <p class="card-text">Temperature: ${temperatureCelsius} &#8451;</p>
                <p class="card-text">Humidity: ${humidity}%</p>
                <p class="card-text">Wind Speed: ${windSpeed} m/s</p>
            </div>
        `;
        forecastSection.appendChild(forecastCard);
    }
}

// Function to handle search button
function handleFormSubmit(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value.trim();

    // Checks if the user did not leave the city empty
    if (city) {
        getWeatherData(city)
            .then((data) => {
                displayCurrentWeather(data);
                displayForecast(data);
                updateSearchHistory(city);
            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        //Throwing an error if city is empty or does not exist
        alert('Please enter a city name.');
    }
}

// Update Search History function
function updateSearchHistory(city) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    const searchHistoryList = document.querySelector('#search-history .list-group');
    searchHistoryList.innerHTML = '';

    // Looping through each item in search history and creating a button element
    searchHistory.forEach((city) => {
        const historyButton = document.createElement('button');
        historyButton.textContent = city;
        historyButton.classList.add('list-group-item', 'list-group-item-action');
        searchHistoryList.appendChild(historyButton);

        // Attaching an event listener to each button so the user can go back to the cities they previously searched
        historyButton.addEventListener('click', handleHistoryCityClick);
    });
}

// Event handler for click on search history city
function handleHistoryCityClick(event) {
    const city = event.target.textContent;
    getWeatherData(city)
        .then((data) => {
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Attaching event listener to the form submission button
document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

// Attaching event listener to the search history list
document.getElementById('search-history').addEventListener('click', handleHistoryCityClick);

//Function to load search history when you open the site
function init() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    updateSearchHistory(searchHistory);
}
//Calling the init function so search history loads when opening
window.addEventListener('load', init);