<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Queue Display</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>Now Serving</h1>
        </header>

        <div class="display-grid">
            <div class="serving-grid" id="servingContainer">
                <!-- Serving items will be populated here -->
                <div class="current-serving empty-state">
                    <h2>Current Number</h2>
                    <div class="big-number">--</div>
                    <div class="big-name">Waiting...</div>
                </div>
            </div>

            <div class="waiting-list-container">
                <h2 style="margin-bottom: 1rem; color: var(--text-secondary);">Up Next</h2>
                <div class="queue-list waiting-list" id="displayQueueList">
                    <!-- Waiting items -->
                </div>
            </div>
        </div>
    </div>

    <script src="assets/js/display.js"></script>
</body>
</html>
