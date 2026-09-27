<?php
declare(strict_types=1);

/**
 * Calculate a quote in integer cents using prices from a server-owned catalog.
 * The request supplies product IDs and quantities, never a trusted total.
 *
 * @param mixed $items
 * @param array<string, int> $catalog
 * @return array{total_cents:int, lines:list<array{id:string, quantity:int, subtotal_cents:int}>}
 */
function quote_order(mixed $items, array $catalog): array
{
    if (!is_array($items) || !array_is_list($items) || count($items) === 0) {
        throw new InvalidArgumentException('items must be a non-empty list');
    }

    $total = 0;
    $lines = [];
    $seen = [];
    foreach ($items as $item) {
        if (!is_array($item) || count($item) !== 2 ||
            !array_key_exists('id', $item) || !array_key_exists('quantity', $item)) {
            throw new InvalidArgumentException('each item needs only id and quantity');
        }
        $id = $item['id'];
        $quantity = $item['quantity'];
        if (!is_string($id) || !array_key_exists($id, $catalog)) {
            throw new InvalidArgumentException('unknown product');
        }
        if (isset($seen[$id])) {
            throw new InvalidArgumentException('duplicate product');
        }
        $seen[$id] = true;
        if (!is_int($quantity) || $quantity < 1 || $quantity > 20) {
            throw new InvalidArgumentException('quantity must be an integer from 1 to 20');
        }
        $price = $catalog[$id];
        if (!is_int($price) || $price < 0 || $price > intdiv(PHP_INT_MAX, $quantity)) {
            throw new InvalidArgumentException('invalid catalog price');
        }
        $subtotal = $price * $quantity;
        if ($total > PHP_INT_MAX - $subtotal) {
            throw new InvalidArgumentException('total exceeds integer range');
        }
        $total += $subtotal;
        $lines[] = ['id' => $id, 'quantity' => $quantity, 'subtotal_cents' => $subtotal];
    }

    return ['total_cents' => $total, 'lines' => $lines];
}
