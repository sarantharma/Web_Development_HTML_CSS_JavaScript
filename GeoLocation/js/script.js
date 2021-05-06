// #######################################################################################
// ################################# XML Request #########################################

const countriesContainer = document.querySelector(".result_container");
const neighbourContainer = document.querySelector(".neighbour_container");
// const neighbourContainer = document.querySelector(".neighbour_container");

// AJAX calls
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener("load", function () {
    console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const country_html = `<img src="${data.flag}" alt="Country image" />
    <div class="country_details">
      <h2>${data.name}</h2>
      <h3>${data.region}</h3>
      <p>Population 👫 ${data.population}</p>
      <p>Languages 🗣 ${data.languages[0].name}</p>
      <p>Currency 💰 ${data.currencies[0].name}</p>
      <p>Time zones 🕰 ${data.timezones}</p>
      <p>callingCodes ☎️: +${data.callingCodes}</p>
    </div>`;
    countriesContainer.insertAdjacentHTML("beforeend", country_html);
    countriesContainer.style.opacity = 1;
    const neighbour = data.borders;
    if (!neighbour) {
    } else {
      neighbour.forEach((element) => {
        // console.log(element);
        getNeighbour(element);
      });
    }
  });
};

const getNeighbour = function (neighbour) {
  const request2 = new XMLHttpRequest();
  request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
  request2.send();

  request2.addEventListener("load", function () {
    const data2 = JSON.parse(this.responseText);

    const neighbout_html = `<div class="result2_container">
    <img src="${data2.flag}" alt="Country image" />
    <h2 class="neighbour_name">${data2.name}</h2>
  </div>`;

    neighbourContainer.insertAdjacentHTML("beforeend", neighbout_html);
  });
};

const button = document.querySelector(".search_button");
const input = document.querySelector(".search_input");

button.addEventListener("click", function () {
  getCountryData(input.value);
});
