let weather = {
    apiKey: "46c239bcac248c5a373f2622af1125f6",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city +
            "&units=metric&appid=" + this.apiKey
        )
            .then((response) => {
                if (response.status === 404) {
                    // Handle the case where location is not found
                    const errorMessage = "Location not found";
                    document.querySelector(".error-message").textContent = errorMessage;
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    this.displayWeather(data);
                }
            });
    },
    displayWeather: function(data) {
        if(data.cod === "404"){
            console.log("Location not found");
        }
        else{
            const {name} = data;
            const {icon,description} = data.weather[0];
            const {temp, humidity} = data.main;
            const {speed} = data.wind;
            console.log(name,icon,description,temp,humidity,speed);

            const cardElement = document.querySelector(".weather");
            cardElement.classList.add("fade-in");

            document.querySelector(".city").innerHTML= "Weather in " +name;
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".temp").innerHTML= temp + " °C";
            document.querySelector(".humidity").innerHTML= "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerHTML= "Wind speed: " + speed + " km/h";
            this.clearErrorMessage();
        }
    },
    clearErrorMessage : function(){
        document.querySelector(".error-message").textContent = " ";
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
    weather.clearErrorMessage();
    const cardElement = document.querySelector(".card");
    cardElement.classList.toggle("fade-in");
});

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
        weather.clearErrorMessage();

        const cardElement = document.querySelector(".card");
         cardElement.classList.toggle("fade-in");
    }
});