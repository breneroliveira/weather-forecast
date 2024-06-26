const input = document.querySelector("input");
const button = document.querySelector("button");

const place = document.querySelector("#place");
const degrees = document.querySelector("#degrees");
const description = document.querySelector("#description");
const img = document.querySelector("img");
const wind = document.querySelector("#wind");
const weather_data = document.querySelector("#weather_data");
const cityInput = document.querySelector("#city-input");

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

cityInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value;

        getDataApi(city);
    }
});

async function getDataApi() {
    let url = `https://api.openweathermap.org/data/2.5/weather?lang=pt_br&q=${encodeURI(
        input.value
    )}&units=metric&appid=27547512439417ed7b8e1ef99cdb6695`;

    try {
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data?.cod && data.cod === "404") {
                    return alert("Local não encontrado!");
                }

                loadData(data);
            });
    } catch (error) {
        alert(error);
    }
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C`;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    description.innerHTML = `Clima: ${data.weather[0].description}`;
    wind.innerHTML = `Vento: ${data.wind.speed} km/h`;
    weather_data.classList.remove("hide");
    weather_data.style.display = "flex";
}