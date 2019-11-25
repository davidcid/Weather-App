window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/7321e1a727de08fec6968e1bc22e88b7/${lat},${long}`;

      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { temperature, summary, icon } = data.currently;
        // Set DOM Elements from the API
        temperatureDegree.textContent = temperature.toFixed(1);
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
          // Formula for celsius
          let celsius = (temperature - 32) * (5 / 9);

          // Set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if(temperatureSpan.textContent === "ºF") {
              temperatureSpan.textContent = "ºC";
              temperatureDegree.textContent = celsius.toFixed(1);
            } else {
              temperatureSpan.textContent = "ºF";
              temperatureDegree.textContent = temperature.toFixed(1);
            }
          })
      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});