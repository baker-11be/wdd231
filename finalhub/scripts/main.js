import './navigation.js';
import { fetchFarms, renderFarmGrid, animateStats } from './fetch.js';
import { getLastViewedFarm, saveLastViewedFarm } from './storage.js';
import { openModal } from './modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const farms = await fetchFarms();
    if (farms) {
        renderFarmGrid(farms);
        animateStats(farms);
        // reopen last viewed if any
        const lastId = getLastViewedFarm();
        if (lastId) {
            const farm = farms.find(f => f.id === parseInt(lastId));
            if (farm) openModal(farm);
        }
        // Delegated click handler to open modal and save last viewed
        const grid = document.getElementById('farm-grid');
        if (grid) {
            grid.addEventListener('click', (e) => {
                const card = e.target.closest('.farm-card');
                if (!card) return;
                const id = card.getAttribute('data-id');
                if (!id) return;
                const farm = farms.find(f => String(f.id) === id);
                if (farm) {
                    saveLastViewedFarm(farm.id);
                    openModal(farm);
                }
            });
        }
    }
});