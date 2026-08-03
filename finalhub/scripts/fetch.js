// fetchFarms: Attempt to load farm data from data/cattle.json. Returns [] on any error.
export async function fetchFarms() {
    try {
        const res = await fetch('data/cattle.json', { cache: 'no-store' });
        if (!res.ok) return [];
        // try parse JSON, but protect against invalid content
        try {
            const json = await res.json();
            return Array.isArray(json) ? json : [];
        } catch (e) {
            // file may not be valid JSON (fallback), return empty list
            return [];
        }
    } catch (e) {
        return [];
    }
}

// renderFarmGrid: lightweight renderer that shows basic cards when farms are provided.
export function renderFarmGrid(farms) {
    const grid = document.getElementById('farm-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (!Array.isArray(farms) || farms.length === 0) {
        grid.innerHTML = '<p style="text-align:center;padding:1rem;color:#666">No farms available right now.</p>';
        return;
    }
    const frag = document.createDocumentFragment();
    farms.forEach(f => {
        const card = document.createElement('div');
        card.className = 'farm-card';
        card.setAttribute('data-id', String(f.id || ''));
                card.innerHTML = `
                        <img src="${f.photoUrl || 'images/grazing.webp'}" alt="${f.name || 'Farm'}" loading="lazy" width="600" height="360" />
                        <div class="farm-info">
              <h3>${f.name || 'Farm'}</h3>
              <p class="breeds">${(f.mainBreeds || []).join(', ')}</p>
              <p class="farm-address">${f.address || ''}</p>
            </div>
        `;
        frag.appendChild(card);
    });
    grid.appendChild(frag);
}

// animateStats: animate all elements with `.stat-number` from 0 to their `data-target`.
export function animateStats(farms) {
    const els = Array.from(document.querySelectorAll('.stat-number'));

    // Compute targets from farms when available, otherwise fall back to data-target attribute
    let computedTargets = [];
    if (Array.isArray(farms) && farms.length > 0) {
        const farmsFeatured = farms.length;
        const breedSet = new Set();
        const districtSet = new Set();
        let visitorsSum = 0;
        farms.forEach(f => {
            (f.mainBreeds || []).forEach(b => breedSet.add(b));
            if (f.district) districtSet.add(f.district);
            visitorsSum += parseInt(f.visitors || 0, 10) || 0;
        });
        computedTargets = [farmsFeatured, breedSet.size, districtSet.size, visitorsSum];
    }

    els.forEach((el, i) => {
        let target = computedTargets[i] ?? parseInt(el.getAttribute('data-target') || '0', 10) || 0;
        // if already non-zero, skip
        if (parseInt(el.textContent?.replace(/,/g, '') || '0', 10) >= target) return;

        // duration adapts to size but stays reasonable
        const duration = Math.min(2200, 800 + (target * 12));
        const frameRate = 60;
        const totalFrames = Math.round((duration / 1000) * frameRate);
        let frame = 0;
        const start = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const current = Math.round(start + (target - start) * easeOutQuad(progress));
            el.textContent = formatNumber(current);
            if (frame >= totalFrames) {
                el.textContent = formatNumber(target);
                clearInterval(counter);
            }
        }, Math.round(1000 / frameRate));
    });

    function easeOutQuad(t) { return t * (2 - t); }
    function formatNumber(n) { return n.toLocaleString(); }
}

// Note: navigation behavior (hamburger and active link) lives in navigation.js