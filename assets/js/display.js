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
    // Find the item currently being served
    const serving = items.find(item => item.status === 'serving');
    
    const numberEl = document.getElementById('servingNumber');
    const nameEl = document.getElementById('servingName');
    const container = document.getElementById('currentServing');

    if (serving) {
        numberEl.textContent = serving.queue_number;
        nameEl.textContent = serving.name;
        container.style.borderColor = 'var(--success)';
        container.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.2)';
    } else {
        // If no one is serving, show the top alert or waiting
        const top = items.find(item => item.status === 'alert') || items.find(item => item.status === 'waiting');
        if (top) {
             // Optional: Show next person if no one is serving? 
             // Or just keep it empty. Let's keep it empty or show "Waiting..."
             numberEl.textContent = '--';
             nameEl.textContent = 'Waiting...';
             container.style.borderColor = 'rgba(255, 255, 255, 0.1)';
             container.style.boxShadow = 'none';
        } else {
             numberEl.textContent = '--';
             nameEl.textContent = 'Queue Empty';
             container.style.borderColor = 'rgba(255, 255, 255, 0.1)';
             container.style.boxShadow = 'none';
        }
    }

    // Render the list (excluding the one being served if we want, or show all waiting/alert)
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
