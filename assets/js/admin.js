const API_URL = 'api/queue.php';

// Initial load
const counterInput = document.getElementById('counterName');
if (localStorage.getItem('counterName')) {
    counterInput.value = localStorage.getItem('counterName');
}

counterInput.addEventListener('change', (e) => {
    localStorage.setItem('counterName', e.target.value);
});

fetchQueue();

// Poll every 5 seconds
setInterval(fetchQueue, 5000);

function handleEnter(e) {
    if (e.key === 'Enter') {
        addToQueue();
    }
}

async function addToQueue() {
    const nameInput = document.getElementById('customerName');
    const name = nameInput.value.trim();
    
    if (!name) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        
        if (response.ok) {
            nameInput.value = '';
            fetchQueue();
        }
    } catch (error) {
        console.error('Error adding to queue:', error);
    }
}

async function fetchQueue() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderQueue(data);
    } catch (error) {
        console.error('Error fetching queue:', error);
    }
}

function renderQueue(items) {
    const list = document.getElementById('adminQueueList');
    list.innerHTML = items.map(item => `
        <div class="queue-item status-${item.status}">
            <div class="queue-info">
                <h3>${item.queue_number} - ${escapeHtml(item.name)}</h3>
                <p>Status: ${item.status.toUpperCase()} ${item.status === 'serving' && item.served_by ? `(by ${escapeHtml(item.served_by)})` : ''}</p>
            </div>
            <div class="actions">
                ${item.status !== 'serving' ? 
                    `<button class="btn-success" onclick="updateStatus(${item.id}, 'serving')">Serve</button>` : 
                    `<button class="btn-success" onclick="updateStatus(${item.id}, 'done')">Done</button>`
                }
                ${item.status !== 'alert' && item.status !== 'done' ? 
                    `<button class="btn-danger" onclick="updateStatus(${item.id}, 'alert')">Alert</button>` : ''
                }
                <button class="btn-warning" onclick="editName(${item.id}, '${escapeHtml(item.name)}')">Edit</button>
                <button class="btn-danger" onclick="deleteItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
}

async function updateStatus(id, status) {
    const counterName = document.getElementById('counterName').value || 'Counter 1';
    
    const body = { id, status };
    if (status === 'serving') {
        body.served_by = counterName;
    }

    try {
        await fetch(API_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        fetchQueue();
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

async function editName(id, currentName) {
    const newName = prompt('Enter new name:', currentName);
    if (newName && newName !== currentName) {
        try {
            await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, name: newName })
            });
            fetchQueue();
        } catch (error) {
            console.error('Error editing name:', error);
        }
    }
}

async function deleteItem(id) {
    if (confirm('Are you sure you want to remove this item?')) {
        try {
            await fetch(API_URL, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            fetchQueue();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
