const apiKey = 'ec016f71ed2637f67795b213f9709076';
const latitude = -1.28538;
const longitude = 29.68497;
const units = 'metric';

const weatherCurrent = document.getElementById('weather-current');
const weatherForecast = document.getElementById('weather-forecast');
const spotlightContainer = document.getElementById('spotlights');
const currentYear = document.getElementById('current-year');

async function fetchWeather() {
    if (!apiKey) {
        weatherCurrent.innerHTML = '<p class="error">Weather data requires an OpenWeatherMap API key. Add your key to <code>scripts/home.js</code> (apiKey) to enable live weather.</p>';
        weatherForecast.innerHTML = '';
        return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
        if (!currentResponse.ok) {
            throw new Error(`Weather request failed: ${currentResponse.status}`);
        }
        if (!forecastResponse.ok) {
            throw new Error(`Forecast request failed: ${forecastResponse.status}`);
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        displayWeather(currentData, forecastData);
    } catch (error) {
        weatherCurrent.innerHTML = `<p class="error">Unable to load weather. ${error.message}</p>`;
        weatherForecast.innerHTML = '';
        console.error('Weather error:', error);
    }
}

function getThreeDayForecast(forecastList) {
    const todayKey = new Date().toISOString().slice(0, 10);
    const days = new Map();

    forecastList.forEach((item) => {
        if (!item?.dt_txt) return;
        const dateKey = item.dt_txt.slice(0, 10);
        if (dateKey === todayKey) return;
        if (!days.has(dateKey)) days.set(dateKey, []);
        days.get(dateKey).push(item);
    });

    return Array.from(days.entries())
        .slice(0, 3)
        .map(([dateKey, entries]) => {
            const temps = entries.map((e) => e.main?.temp).filter((t) => typeof t === 'number');
            const max = temps.length ? Math.round(Math.max(...temps)) : '';
            const min = temps.length ? Math.round(Math.min(...temps)) : '';

            const noonEntry = entries.find((e) => e.dt_txt?.includes('12:00:00')) || entries[0];
            const description = noonEntry?.weather?.[0]?.description || 'Clear';
            const icon = noonEntry?.weather?.[0]?.icon || '';

            return { dateKey, max, min, description, icon };
        });
}

function displayWeather(currentData, forecastData) {
    const description = currentData.weather?.[0]?.description || 'Unknown weather';
    const temp = Math.round(currentData.main?.temp ?? 0);
    const icon = currentData.weather?.[0]?.icon;
    const iconSrc = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '';
    const altText = `${description} icon`;

    weatherCurrent.innerHTML = `
        <div class="weather-current-card">
            <img src="${iconSrc}" alt="${altText}" />
            <div>
                <p class="weather-temp">${temp}°C</p>
                <p class="weather-desc">${description}</p>
            </div>
        </div>
    `;

    const forecastDays = getThreeDayForecast(forecastData.list || []);
    weatherForecast.innerHTML = forecastDays
        .map((day) => {
            const date = new Date(`${day.dateKey}T00:00:00`);
            const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const iconUrl = day.icon ? `https://openweathermap.org/img/wn/${day.icon}@2x.png` : '';

            return `
                <article class="forecast-day">
                    <strong>${dayLabel}</strong>
                    <img src="${iconUrl}" alt="${day.description} icon" />
                    <p>${day.description}</p>
                    <p>${day.max}° / ${day.min}°C</p>
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
        const spotlightCount = Math.random() < 0.5 ? 2 : 3;
        const spotlightMembers = getRandomMembers(members, spotlightCount);
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
