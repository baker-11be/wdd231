document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Display form data
    const dataContainer = document.getElementById('submitted-data');
    
    // Define fields to display (all required fields)
    const fields = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Email Address', key: 'email' },
        { label: 'Mobile Phone', key: 'phone' },
        { label: 'Business/Organization Name', key: 'business' },
        { label: 'Application Date', key: 'timestamp' }
    ];
    
    // Check if we have data
    let hasData = false;
    let html = '';
    
    fields.forEach(field => {
        const value = params.get(field.key);
        if (value) {
            hasData = true;
            // Format timestamp nicely if present
            let displayValue = value;
            if (field.key === 'timestamp') {
                try {
                    const date = new Date(value);
                    if (!isNaN(date)) {
                        displayValue = date.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    }
                } catch (e) {
                    displayValue = value;
                }
            }
            html += `
                <div class="data-row">
                    <span class="data-label">${field.label}</span>
                    <span class="data-value">${displayValue}</span>
                </div>
            `;
        }
    });
    
    if (hasData) {
        dataContainer.innerHTML = html;
    } else {
        dataContainer.innerHTML = `
            <div class="data-row">
                <span class="data-label">Status</span>
                <span class="data-value">No form data submitted</span>
            </div>
        `;
    }
});