// const apikey="76cd47003fe4eba1edad68edace3a2fd";
// const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const search =document.querySelector(".search input");
// const searchbtn =document.querySelector(".search button");
// const weatherIcon=document.querySelector(".weather-icon");
// async function checkWeather(city) {
//     const response =await fetch(apiUrl+city+`&appid=${apikey}`); 
//     const city = document.querySelector("#cityInput").value;

//      if(response.status==404){
//         document.querySelector(".error").style.display="block";
//         document.querySelector(".weather").style.display="none";

//     }
//     else{
//         var data =await response.json();
    
//         document.querySelector(".city").innerHTML=data.name;
//         document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
//         document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
//         document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
    
//         if(data.weather[0].main=="Clouds"){
//             weatherIcon.src ="img/clouds.png";
    
//         }
//         else if(data.weather[0].main=="clear"){
//             weatherIcon.src ="img/clear.png";
//         }
//         else if(data.weather[0].main=="Rain"){
//             weatherIcon.src ="img/rain.png";
//         }
//         else if(data.weather[0].main=="Drizzle"){
//             weatherIcon.src ="img/drizzle.png";
//         }
//         else if(data.weather[0].main=="Mist"){
//             weatherIcon.src ="img/mist.png";
//         }
//         else if(data.weather[0].main=="Snow"){
//             weatherIcon.src ="img/snow.png";
//         }
    
//         document.querySelector(".weather").style.display="block";
//         document.querySelector(".error").style.display="none";

    

//     }
   

// }
// searchbtn.addEventListener("click",()=>{
//     checkWeather(search.value);
// })


// Function to check the weather using OpenWeatherMap API
async function checkWeather() {
    // Get the city input value
    const city = document.querySelector("input").value;

    // Check if the city name is provided
    if (!city) {
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather data
        return; // Stop execution if no city is provided
    }

    // Hide error initially
    document.querySelector(".error").style.display = "none";

    // Construct the API URL with the city and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=76cd47003fe4eba1edad68edace3a2fd`;

    try {
        // Fetch weather data from the API
        const response = await fetch(apiUrl);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`City not found`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Check if temperature data exists in the response
        if (data.main && data.main.temp) {
            // Update the UI with the temperature, city name, humidity, and wind speed
            document.querySelector(".country").textContent=data.sys.country; 
            document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
            document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

            // Display the weather information
            document.querySelector(".weather").style.display = "block";
        } else {
            throw new Error("Temperature data not available");
        }
    } catch (error) {
        // Handle errors (e.g., city not found)
        document.querySelector(".error").style.display = "block"; // Show error message
        document.querySelector(".weather").style.display = "none"; // Hide weather data
    }
}

// Add event listener to the search button
document.querySelector("button").addEventListener("click", checkWeather);
