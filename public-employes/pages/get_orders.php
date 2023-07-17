<?php 

date_default_timezone_set('US/Eastern');

$orders = array(
    array(125, date('Y-m-d H:i:s', strtotime('-580 seconds')), array(1, 'hamburger', ''), array(1, 'thé glacé', 'sans glace')),
    array(128, date('Y-m-d H:i:s', strtotime('-380 seconds')), array(1, 'sauté', ''), array(1, 'bol de riz blanc'), array(2, 'rouleau printanier', ''), array(1, 'kombucha', 'cerises')),
    array(131, date('Y-m-d H:i:s', strtotime('-180 seconds')), array(1, 'spaghetti', 'extra parmesan'))
);

header('Content-Type: application/json');
echo json_encode($orders);

?>
