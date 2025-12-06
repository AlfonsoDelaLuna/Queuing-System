<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Queue Admin - Counter 2</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>Queue Management</h1>
            <p>Staff Control Panel - Counter 2</p>
            <div class="counter-settings" style="margin-top: 1rem;">
                <label for="counterName" style="color: var(--text-secondary); margin-right: 0.5rem;">My Counter:</label>
                <input type="text" id="counterName" placeholder="e.g. Counter 2" style="padding: 0.5rem; border-radius: 0.5rem; border: 1px solid var(--border-color); background: var(--bg-secondary); color: var(--text-primary);">
            </div>
        </header>

        <div class="card">
            <div class="form-group">
                <input type="text" id="customerName" placeholder="Enter customer name..." onkeypress="handleEnter(event)">
                <button class="btn-primary" onclick="addToQueue()">Add to Queue</button>
            </div>
        </div>

        <div class="queue-list" id="adminQueueList" style="margin-top: 2rem;">
            <!-- Queue items will be populated here -->
        </div>
    </div>

    <script src="assets/js/admin.js"></script>
</body>
</html>
