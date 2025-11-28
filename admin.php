<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Queue Admin - Staff Portal</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>Queue Management</h1>
            <p>Staff Control Panel</p>
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
