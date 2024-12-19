const apiKey = "c76e58710fb683756c68eb6ccba1c9d8";

const weatherDate = document.getElementById("Weather-date");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form")

form.addEventListener("submit", (evet) => {
	evet.preventDefault();
	const cityValue = cityInput.value;
	setIndiviual(cityValue);
});




async function setIndiviual(cityValue) {
	try {
		const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric
`)

		if (!response.ok) {
			throw new Error("Network response was not ok")
		}

		const data = await response.json();

		const temperature = Math.round(data.main.temp)
	
		const description = data.weather[0].description;
		const icon = data.weather[0].icon;

		const details = [
			`Feels like: ${Math.round(data.main.feels_like)}°C`,
			`Humidit: ${data.main.humidity}%`,
			`Wind speed: ${data.wind.speed}m/s`
		]




		weatherDate.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
		 
		weatherDate.querySelector(".temperature").innerHTML = `${temperature}°C`

		weatherDate.querySelector(".description").innerHTML = description;

		weatherDate.querySelector(".details").innerHTML = details.map((detail) => `	<div>${detail}</div>`).join("")

	} catch (error) {
		
		weatherDate.querySelector(".icon").innerHTML = "";
		 
		weatherDate.querySelector(".temperature").innerHTML = "";

		weatherDate.querySelector(".description").innerHTML = "Something went wrong please try again later";

		weatherDate.querySelector(".details").innerHTML = ""
	}
}

