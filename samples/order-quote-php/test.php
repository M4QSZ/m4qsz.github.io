<?php
declare(strict_types=1);

require_once __DIR__ . '/quote.php';

function expect_invalid(mixed $items, array $catalog): void
{
    try {
        quote_order($items, $catalog);
    } catch (InvalidArgumentException) {
        return;
    }
    throw new RuntimeException('Expected invalid input to be rejected');
}

$catalog = ['coffee' => 350, 'sandwich' => 825];
$quote = quote_order([
    ['id' => 'coffee', 'quantity' => 2],
    ['id' => 'sandwich', 'quantity' => 1],
], $catalog);
if ($quote['total_cents'] !== 1525 || count($quote['lines']) !== 2) {
    throw new RuntimeException('Incorrect quote');
}
$reordered = quote_order([['quantity' => 2, 'id' => 'coffee']], $catalog);
if ($reordered['total_cents'] !== 700) {
    throw new RuntimeException('Field order changed the quote');
}

expect_invalid([], $catalog);
expect_invalid([['id' => 'unknown', 'quantity' => 1]], $catalog);
expect_invalid([['id' => 'coffee', 'quantity' => 0]], $catalog);
expect_invalid([['id' => 'coffee', 'quantity' => 1, 'price_cents' => 1]], $catalog);
expect_invalid([['id' => 'coffee', 'quantity' => '2']], $catalog);
expect_invalid([['id' => 'coffee', 'quantity' => 10], ['id' => 'coffee', 'quantity' => 20]], $catalog);
expect_invalid([['id' => 'huge', 'quantity' => 20]], ['huge' => PHP_INT_MAX]);

echo "PHP quote cases passed.\n";
