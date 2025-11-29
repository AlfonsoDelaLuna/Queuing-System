<?php
require_once 'config/db.php';

try {
    // Check if column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM queue_items LIKE 'served_by'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE queue_items ADD COLUMN served_by VARCHAR(50) DEFAULT NULL");
        echo "Column 'served_by' added successfully.";
    } else {
        echo "Column 'served_by' already exists.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
