# PHP 8.1+: server-owned order quote

This independent PHP example validates a JSON order request and calculates totals in integer cents from a server-owned catalog. It rejects client-supplied prices, unknown products, invalid quantities and arithmetic overflow.

```text
php test.php
php -S localhost:8000 index.php
```

The endpoint is a learning sample, not a payment processor, inventory system or Laravel application. It has a hard-coded catalog and no authentication, persistence or rate limiting. Syntax checks and `php test.php` passed locally with PHP 8.2.12 from XAMPP. Review it personally before citing it as evidence.
