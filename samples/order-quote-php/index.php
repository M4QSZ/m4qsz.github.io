<?php
declare(strict_types=1);

require_once __DIR__ . '/quote.php';

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'POST required']);
    exit;
}

try {
    $body = file_get_contents('php://input');
    if ($body === false || strlen($body) > 65536) {
        throw new InvalidArgumentException('invalid request size');
    }
    $request = json_decode($body, true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($request) || array_keys($request) !== ['items']) {
        throw new InvalidArgumentException('request must contain only items');
    }

    // A real application would load this catalog from trusted server storage.
    $catalog = ['coffee' => 350, 'sandwich' => 825];
    echo json_encode(quote_order($request['items'], $catalog), JSON_THROW_ON_ERROR);
} catch (InvalidArgumentException | JsonException $error) {
    http_response_code(400);
    echo json_encode(['error' => $error->getMessage()]);
}
