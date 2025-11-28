<?php
require_once 'config/db.php';

try {
    $sql = "CREATE TABLE IF NOT EXISTS queue_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        queue_number VARCHAR(50) NOT NULL,
        status ENUM('waiting', 'alert', 'serving', 'done') DEFAULT 'waiting',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "Database and Table setup successfully.";
} catch (PDOException $e) {
    echo "Setup failed: " . $e->getMessage();
}
?>
