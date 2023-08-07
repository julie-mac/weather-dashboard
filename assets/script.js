const apiKey = 'ef8743cab46a8d9dba624043e120f77a'; 
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch weather data from OpenWeather
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
    

    const currentWeatherSection = document.getElementById('current-weather');
    currentWeatherSection.innerHTML = `
        <h2>${city} - ${date}</h2>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperatureCelsius} &#8451;</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}


// Function to display the 5-day forecast
function displayForecast(data) {
    // Extract the required data from the API response for the next 5 days
    const forecastList = data.list.slice(1, 6); // Get the next 5 days' data

    // Update the HTML elements to display the 5-day forecast
    const forecastSection = document.getElementById('forecast');
    forecastSection.innerHTML = `<h2>5-Day Forecast</h2>`;

    // Loop through the forecast data and create forecast cards for each day
    forecastList.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString();
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        const temperature = forecast.main.temp;
        //Converting temp from Kelvin to Celsius
        const temperatureCelsius = (temperature - 273.15).toFixed(2);
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;

        // Create a forecast card for each day and append to section
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        forecastCard.innerHTML = `
            <p>${date}</p>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>Temperature: ${temperatureCelsius} &#8451;</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
        forecastSection.appendChild(forecastCard);
    });
}

// Function to handle form submission
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
        alert('Please enter a city name.');
    }
}

// Update Search History function
function updateSearchHistory(city) {
    
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        const searchHistoryList = document.querySelector('#search-history ul');
        const newCityItem = document.createElement('li');
        newCityItem.textContent = city;
        searchHistoryList.appendChild(newCityItem);

        // Attach a click event listener to the new city item
        newCityItem.addEventListener('click', handleHistoryCityClick);
    }
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

// Attach event listener to the form submission
document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

// Attach event listener to the search history list
document.getElementById('search-history').addEventListener('click', handleHistoryCityClick);



//NOTES FOR MYSELF

//make the fetch its own function
//handle submit as a different function

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city