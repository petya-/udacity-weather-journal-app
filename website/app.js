/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=dcd55697e22a0e7d7ab0c7b0952b4291";
const countryCode = "dk";
const unitFormat = "&units=metric";

/* Function called by event listener */
const captureUserInput = async (event) => {
  // event.preventDefault();

  // save zip code
  const zipCode = getElementById("zip").value;

  // save user feelings
  const content = getElementById("feelings").value;

  // make request to weather API
  const weatherData = await requestWeatherData(zipCode, countryCode);

  // make request to save data to API
  const projectData = await storeWeatherData(weatherData, content);

  // update UI
  updateUI(projectData);
};

// Event listener to add function to existing HTML DOM element
const button = getElementById("generate");
button.addEventListener("click", captureUserInput);

/* Function to GET Web API Data*/
const requestWeatherData = async (zipCode = "", countryCode = "") => {
  if (!zipCode) alert("You must enter a zip code");
  try {
    const response = await fetch(
      `${baseURL}${zipCode},${countryCode}${unitFormat}${apiKey}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

/* Function to POST data */
const storeWeatherData = async (weatherData, content) => {
  if (!weatherData) return;

  const date = new Date().toLocaleDateString();

  try {
    const data = {
      date,
      temp: weatherData.main.temp,
      content,
      location: weatherData.name,
      icon: weatherData.weather[0].icon,
      description: weatherData.weather[0].description,
    };
    const response = await fetch("/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {}
};

// Update UI
function updateUI(data) {
  if (!data) return;
  // update new entry values
  document.getElementById("entryHolder").style.display = "flex";

  document.getElementById("date").innerHTML = data.date;
  document.getElementById("temp").innerHTML = `${data.temp.toFixed()} °C`;
  document.getElementById("content").innerHTML = data.content;
  document.getElementById(
    "description"
  ).innerHTML = data.description.toUpperCase();

  document.getElementById(
    "icon"
  ).src = `http://openweathermap.org/img/wn/${data.icon}.png`;
}

/* Helper Functions */
function getElementById(id) {
  return document.getElementById(id);
}
