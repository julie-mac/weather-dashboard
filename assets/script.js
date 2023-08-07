






// const searchBtn = document.querySelector(".search-btn");
// const searchInput = document.querySelector(".city-search");
// const searchHistory = document.querySelector(".search-history");
// const weatherSection = document.querySelector(".weather-info");

// // searchBtn.addEventListener("click", function(event) {})



// function getWeather(cityName) {
//     const cityName = searchInput.value.trim();
//     localStorage.setItem("city", cityName);
//     console.log(cityName);
    
//     const prevCity = localStorage.getItem("city").valueOf;
//     history = document.createElement("button");
//     history.innerHTML = prevCity;
//     searchHistory.appendChild(history);

//     const cityURL = `https://api.openweathermap.org/data/2.5/weather?appid=ef8743cab46a8d9dba624043e120f77a&q=${cityName}&units=metric`;

//     //Fetching current weather
//     fetch(cityURL)
//     .then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);

//         const searchInfo = document.querySelector(".weather-info");
//         const cityDisplay = document.createElement("h3");
//         cityDisplay.textContent = `Here is the weather forecast for ${cityName}:`;
//         searchInfo.appendChild(cityDisplay);


//         //Storing latitude and longitude elements pulled from the current API
//         const coordinates = [data.coord.lat, data.coord.lon];
        
        // const latitude = data.coord.lat;
        // const longitude = data.coord.lon;
        // console.log(longitude);
        // console.log(latitude);
    })
}
        // const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=ef8743cab46a8d9dba624043e120f77a&units=metric`;

        // //Fetching 5 day forecast 
        // fetch (fiveDayURL)
        // .then(function (response) {
        //     return response.json();
        // }).then(function (data) {
        //     console.log(data);
        // }).catch(function(err) {
        //     console.log(err);
        // });


    // }).catch(function(err) {
    //     console.log(err);
    // });




//handlesubmit function - don't link directly to search btn

// var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
// var cityURL = `https://api.openweathermap.org/data/2.5/weather?appid=ef8743cab46a8d9dba624043e120f77a&q=${cityName}&units=imperial`
// var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=ef8743cab46a8d9dba624043e120f77a`;


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