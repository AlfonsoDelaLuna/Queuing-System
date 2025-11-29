const API_URL = 'api/queue.php';
let lastAlertId = null;

// Initial load
fetchQueue();

// Poll every 2 seconds for faster updates on display
setInterval(fetchQueue, 2000);

async function fetchQueue() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderDisplay(data);
        checkAlerts(data);
    } catch (error) {
        console.error('Error fetching queue:', error);
    }
}

function renderDisplay(items) {
    // Find all items currently being served
    const servingItems = items.filter(item => item.status === 'serving');
    const container = document.getElementById('servingContainer');
    
    if (servingItems.length > 0) {
        container.innerHTML = servingItems.map(item => `
            <div class="current-serving" style="border-color: var(--success); box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);">
                <h2>Now Serving</h2>
                <div class="big-number">${item.queue_number}</div>
                <div class="big-name">${escapeHtml(item.name)}</div>
                <div class="counter-name">${escapeHtml(item.served_by || 'Counter 1')}</div>
            </div>
        `).join('');
    } else {
        container.innerHTML = `
            <div class="current-serving empty-state">
                <h2>Current Number</h2>
                <div class="big-number">--</div>
                <div class="big-name">Waiting...</div>
            </div>
        `;
    }

    // Render the waiting list
    const list = document.getElementById('displayQueueList');
    const waitingItems = items.filter(item => item.status === 'waiting' || item.status === 'alert');
    
    list.innerHTML = waitingItems.map(item => `
        <div class="queue-item status-${item.status}">
            <div class="queue-info">
                <h3>${item.queue_number}</h3>
                <p>${escapeHtml(item.name)}</p>
            </div>
            <div class="status-badge" style="
                background: ${item.status === 'alert' ? 'var(--danger)' : 'var(--accent)'};
                padding: 0.25rem 0.75rem;
                border-radius: 1rem;
                font-size: 0.875rem;
                font-weight: 600;
            ">
                ${item.status.toUpperCase()}
            </div>
        </div>
    `).join('');
}

function checkAlerts(items) {
    const alertItem = items.find(item => item.status === 'alert');
    if (alertItem && alertItem.id !== lastAlertId) {
        lastAlertId = alertItem.id;
        playAlertSound();
    }
}

function playAlertSound() {
    // Simple beep or notification sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(e => console.log('Audio play failed (user interaction needed first):', e));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
