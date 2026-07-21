const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const latitude = 44.7745;
const longitude = -117.8345; // Kisoro City
const units = 'imperial';

const weatherCurrent = document.getElementById('weather-current');
const weatherForecast = document.getElementById('weather-forecast');
const spotlightContainer = document.getElementById('spotlights');
const currentYear = document.getElementById('current-year');

async function fetchWeather() {
    if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY') {
        weatherCurrent.innerHTML = '<p class="error">Weather data requires an OpenWeatherMap API key in <code>scripts/home.js</code>.</p>';
        weatherForecast.innerHTML = '';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude=minutely,hourly,alerts&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather request failed: ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherCurrent.innerHTML = `<p class="error">Unable to load weather. ${error.message}</p>`;
        weatherForecast.innerHTML = '';
        console.error('Weather error:', error);
    }
}

function displayWeather(data) {
    const current = data.current;
    const description = current.weather[0]?.description || 'Unknown weather';
    const temp = Math.round(current.temp);
    const icon = current.weather[0]?.icon;
    const iconSrc = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '';
    const altText = `${description} icon`;

    weatherCurrent.innerHTML = `
        <div class="weather-current-card">
            <img src="${iconSrc}" alt="${altText}" />
            <div>
                <p class="weather-temp">${temp}°F</p>
                <p class="weather-desc">${description}</p>
            </div>
        </div>
    `;

    const forecastDays = data.daily.slice(1, 4);
    weatherForecast.innerHTML = forecastDays
        .map((day) => {
            const date = new Date(day.dt * 1000);
            const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const max = Math.round(day.temp.max);
            const min = Math.round(day.temp.min);
            const iconCode = day.weather[0]?.icon;
            const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
            const descriptionText = day.weather[0]?.description || 'Clear';

            return `
                <article class="forecast-day">
                    <strong>${dayLabel}</strong>
                    <img src="${iconUrl}" alt="${descriptionText} icon" />
                    <p>${descriptionText}</p>
                    <p>${max}° / ${min}°</p>
                </article>
            `;
        })
        .join('');
}

async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error(`Member data request failed: ${response.status}`);
        }

        const json = await response.json();
        const members = json.members.filter((member) => member.membership_level >= 2);
        const spotlightMembers = getRandomMembers(members, 3);
        renderSpotlights(spotlightMembers);
    } catch (error) {
        spotlightContainer.innerHTML = `<p class="error">Unable to load member spotlights.</p>`;
        console.error('Spotlight error:', error);
    }
}

function getRandomMembers(members, count) {
    const shuffled = [...members];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function renderSpotlights(members) {
    if (!members.length) {
        spotlightContainer.innerHTML = '<p class="error">No spotlight members are available right now.</p>';
        return;
    }

    spotlightContainer.innerHTML = members
        .map((member) => {
            const membership = member.membership_level === 3 ? 'Gold Member' : 'Silver Member';
            const badgeClass = member.membership_level === 3 ? 'gold' : 'silver';

            return `
                <article class="spotlight-card">
                    <img src="images/${member.image}" alt="${member.company_name} logo" loading="lazy" />
                    <div class="spotlight-card-content">
                        <h3>${member.company_name}</h3>
                        <p>${member.description}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit website</a></p>
                        <span class="member-badge ${badgeClass}">${membership}</span>
                    </div>
                </article>
            `;
        })
        .join('');
}

function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    fetchWeather();
    fetchSpotlights();
});
