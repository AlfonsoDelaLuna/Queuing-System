<?php
header('Content-Type: application/json');
require_once '../config/db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM queue_items ORDER BY status = 'serving' DESC, status = 'alert' DESC, created_at ASC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['name'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Name is required']);
            exit;
        }
        
        // Generate a simple queue number (e.g., A-001)
        // For simplicity, we'll just use ID or a random number, but let's make it look nice
        // Check if there are any active items (serving, waiting, or alert)
        $stmt = $pdo->query("SELECT count(*) FROM queue_items WHERE status IN ('serving', 'waiting', 'alert')");
        $active_count = $stmt->fetchColumn();
        
        // If no one is active, automatically serve this new person
        $status = ($active_count == 0) ? 'serving' : 'waiting';

        $stmt = $pdo->query("SELECT count(*) FROM queue_items WHERE DATE(created_at) = CURDATE()");
        $count = $stmt->fetchColumn();
        $queue_number = 'A-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);

        $stmt = $pdo->prepare("INSERT INTO queue_items (name, queue_number, status) VALUES (?, ?, ?)");
        $stmt->execute([$data['name'], $queue_number, $status]);
        echo json_encode(['id' => $pdo->lastInsertId(), 'queue_number' => $queue_number]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            exit;
        }

        $fields = [];
        $params = [];

        if (isset($data['status'])) {
            $fields[] = "status = ?";
            $params[] = $data['status'];
        }
        if (isset($data['name'])) {
            $fields[] = "name = ?";
            $params[] = $data['name'];
        }

        if (empty($fields)) {
            echo json_encode(['message' => 'No changes']);
            exit;
        }

        $params[] = $data['id'];
        $sql = "UPDATE queue_items SET " . implode(', ', $fields) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        echo json_encode(['success' => true]);
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'ID is required']);
            exit;
        }
        $stmt = $pdo->prepare("DELETE FROM queue_items WHERE id = ?");
        $stmt->execute([$data['id']]);
        echo json_encode(['success' => true]);
        break;
}
?>
