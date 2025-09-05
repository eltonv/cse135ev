<?php
header("Content-Type: application/json");

// Parse URL
$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim($requestUri, '/')); // e.g. ["api","static"]
$resource = $parts[1] ?? null; // "static", "performance", "activity"
$id = $parts[2] ?? null;

$method = $_SERVER['REQUEST_METHOD'];

// For now, fake storage in JSON files
$storageDir = __DIR__ . "/data";
if (!file_exists($storageDir)) {
    mkdir($storageDir, 0777, true);
}
$file = "$storageDir/{$resource}.json";

// Load existing data
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

switch ($method) {
    case 'GET':
        if ($id) {
            $entry = $data[$id] ?? null;
            echo json_encode($entry ?: ["error" => "Not found"]);
        } else {
            echo json_encode($data);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);
        $newId = uniqid();
        $data[$newId] = $input;
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "created", "id" => $newId]);
        break;

    case 'PUT':
        if (!$id) { http_response_code(400); echo json_encode(["error" => "ID required"]); exit; }
        $input = json_decode(file_get_contents("php://input"), true);
        $data[$id] = $input;
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "updated", "id" => $id]);
        break;

    case 'DELETE':
        if (!$id) { http_response_code(400); echo json_encode(["error" => "ID required"]); exit; }
        unset($data[$id]);
        file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(["status" => "deleted", "id" => $id]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
}
