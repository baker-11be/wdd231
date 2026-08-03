const KEY = 'cattlehub_last_farm';

export function saveLastViewedFarm(id) {
    try {
        localStorage.setItem(KEY, String(id));
    } catch (e) { /* ignore */ }
}

export function getLastViewedFarm() {
    try {
        return localStorage.getItem(KEY);
    } catch (e) { return null; }
}

export function clearLastViewedFarm() {
    try {
        localStorage.removeItem(KEY);
    } catch (e) { /* ignore */ }
}