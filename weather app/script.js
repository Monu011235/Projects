
const searchInput = document.querySelector(".search input");
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchIcon = document.querySelector(".search-icon");
const errorMsg = document.querySelector(".error-msg");
const weatherImg = document.querySelector(".weather-img img");
const apiKey = "ee78e3dc88c7974fe64fb7a392c7b9c9";
let city = "delhi";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



searchInput.addEventListener("input", (e) => {
    city = e.target.value;
    errorMsg.style.display = "none" ;
})
searchInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    seacrWeather();
    }
    })


async function seacrWeather() {
    const data = await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            if(data.name){
            cityName.innerText = data.name;
            temp.innerText = Math.round(data.main.temp - 273.15) + "°c";
            humidity.innerText = `${data.main.humidity}%`;
            wind.innerText = `${data.wind.speed} km/h`;
            switch (data.weather[0].main){
                case "Clouds" : weatherImg.src = "images/clouds.png" ;
                break;
                case "Clear" : weatherImg.src = "images/sun.png" ;
                break;
                case "Rain" : weatherImg.src = "images/rain.png" ;
                break;
                case "Drizzle" : weatherImg.src = "images/drizzle.png" ;
                break;
                case "Mist" : weatherImg.src = "images/mist.png" ;
                break;
                case "Snow" : weatherImg.src = "images/snow.png" ;
                break;
            }
        }else{
            errorMsg.style.display = 'block' ;
        }
        })
}
searchIcon.addEventListener("click", () => {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    seacrWeather();
});
