<?php
// Fetch the restaurant orders from the server and return as JSON response
$orders = array(
    ('0125', ''),
    '0128',
    '0131'
);

header('Content-Type: application/json');
echo json_encode($orders);
?>
