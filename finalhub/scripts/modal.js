const modal = document.getElementById('farm-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = modal?.querySelector('.modal-close');

export function openModal(farm) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = `
        <h2 id="modal-title">${farm.name}</h2>
        ${farm.photoUrl ? `<img src="${farm.photoUrl}" alt="${farm.name}" loading="lazy" onerror="this.src='images/grazing.webp'" />` : ''}
        <p><strong>Breeds:</strong> ${farm.mainBreeds.join(', ')}</p>
        <p><strong>Address:</strong> ${farm.address}</p>
        <p><strong>Cost:</strong> ${farm.cost.amount} — ${farm.cost.description}</p>
        ${farm.website ? `<p><a href="${farm.website}" target="_blank" rel="noopener">Visit website →</a></p>` : ''}
    `;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Close on backdrop click or ESC
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
}