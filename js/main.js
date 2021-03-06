const apiRoot = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '81968ba6230fa88196a89ff1cb735c7a';

const searchForm = document.querySelector(".search-form");
const errorBox = document.querySelector(".error-box");


const fetchWeather = city => {

    const API_URL = `${apiRoot}?q=${city}&units=metric&appid=${apiKey}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (data.cod == "404") {
                errorBox.innerHTML = data.message;
                document.querySelector(".weather").style.visibility = "hidden";
            } else {
                errorBox.innerHTML = "";
                document.querySelector(".weather").style.visibility = "";
                displayWeather(data);
            };
        })
        .catch(error => console.log("Error: ", error))

};


const displayWeather = data => {

    const { name } = data;
    const { temp } = data.main;
    const { icon } = data.weather[0];
    const { description } = data.weather[0];
    const { humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerHTML = `Weather in ` + name;
    document.querySelector(".temp").innerHTML = temp + ` &deg;C`;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = `Humidity: ` + humidity + ` %`;
    document.querySelector(".wind").innerHTML = `Wind speed: ` + speed + ` km/h`;

    document.querySelector(".weather").classList.remove("weather-visibility");

};


const search = event => {
    event.preventDefault();
    fetchWeather(document.querySelector(".search-bar").value);
};


document.querySelector(".search-bar").addEventListener("keyup", function() {
    const submitBtn = document.querySelector(".search-btn");
    if (this.value.trim().length === 0) {
        submitBtn.setAttribute("disabled", true);
    } else {
        submitBtn.removeAttribute("disabled");
        searchForm.addEventListener("submit", search);
    };
});

