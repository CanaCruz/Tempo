const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Traduções das descrições
function traduzirDescricao(desc) {
    const traducoes = {
        'clear sky': 'Céu limpo',
        'few clouds': 'Poucas nuvens',
        'scattered clouds': 'Nuvens dispersas',
        'broken clouds': 'Nuvens quebradas',
        'overcast clouds': 'Nublado',
        'light rain': 'Chuva leve',
        'moderate rain': 'Chuva moderada',
        'heavy intensity rain': 'Chuva forte',
        'rain': 'Chuva',
        'thunderstorm': 'Trovoada',
        'snow': 'Neve',
        'mist': 'Névoa'
    };
    return traducoes[desc.toLowerCase()] || desc;
}

// Traduções dos países
function traduzirPais(codigo) {
    const paises = {
        'BR': 'Brasil',
        'US': 'Estados Unidos',
        'GB': 'Reino Unido',
        'FR': 'França',
        'DE': 'Alemanha',
        'IT': 'Itália',
        'PT': 'Portugal',
        'ES': 'Espanha',
        'JP': 'Japão',
        'CN': 'China',
        'IN': 'Índia',
        'RU': 'Rússia',
        'AR': 'Argentina',
        'CA': 'Canadá',
        'MX': 'México'
        // adicione mais se quiser
    };
    return paises[codigo] || codigo;
}

search.addEventListener('click', () => {
    const APIKey = '78bcc6b3e07f0b81056bf50397477878';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

       if (String(json.cod) === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const input = document.querySelector('.search-box input');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = traduzirDescricao(json.weather[0].description);
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            // Atualiza o input com a cidade + país em português
            input.value = `${json.name}, ${traduzirPais(json.sys.country)}`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});
