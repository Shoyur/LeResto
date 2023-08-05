<?php

if (!empty($_POST['stripeToken'])) {

    require_once('config.php');
    require_once('init.php');

    $token  = $_POST['stripeToken'];
    $customer_id = $_POST['customer_id'];
    $order_name = $_POST['order_name'];
    $order_address = $_POST['order_address'];
    $order_phone = $_POST['order_phone'];
    $order_cc_last4 = $_POST['order_cc_last4'];
    $order_deliv = $_POST['order_deliv'];
    $order_notes = $_POST['order_notes'];
    $cart_data = $_POST['cart_data'];


    $food_ids = array_column($cart_data, 0);
    $item_counts = array_count_values($food_ids);
    $food_ids_string = implode(',', array_unique($food_ids));

    require_once('../models/foodModel.php');
    $foodModel = new FoodModel();
    $result = $foodModel->getFoodTotal($food_ids);
    
    if ($result['ok']) {
        $total = 0;
        foreach ($result['result'] as $food) {
            $food_id = $food['food_id'];
            $food_price = $food['food_price'];
            $quantity = $item_counts[$food_id];
            $total += $food_price * $quantity;
        }
    }

    require_once('../config/taxes.php');
    $tps = $total * TPS;
    $tvq = $total * TVQ;
    $total = ceil(($total + $tps + $tvq) * 100);

    \Stripe\Stripe::setApiKey(SECRET_KEY);

    $charge = \Stripe\Charge::create(array(
        'amount'   => $total,
        'currency' => 'cad',
        'source' => $token,
        'description' => $order_phone
    ));

    $chargeJson = $charge->jsonSerialize();

    // if charge is successful
    if ($chargeJson['amount_refunded'] == 0 && 
        empty($chargeJson['failure_code']) && 
        $chargeJson['paid'] == 1 && 
        $chargeJson['captured'] == 1) {

        //order details 
        $amount = $chargeJson['amount'];
        $status = $chargeJson['status'];
        if ($status == 'succeeded') {

            // update order db
            require_once('../models/orderModel.php');
            $orderModel = new OrderModel();
            $result = $orderModel->createOrder($customer_id, $order_name, $order_address, $order_phone, $amount, $order_cc_last4, $order_deliv, $order_notes, $cart_data);

            $total_string = number_format($amount / 100, 2);
            if ($result[0]) {
                $response['ok'] = true;
                $response['text'] = "Transaction no." . $result[1] . " effectuée avec succès, du montant de $" . $total_string . ".";  
            }
            // charge was successul but db error
            else {
                $response['ok'] = false;
                $response['text'] = "Transaction effectuée avec succès, du montant de $" . $total_string . ", mais erreur au niveau de la base de données (" . $result[1] . ")."; 
            }
        }
        // charge was not successul
        else {
            $response['ok'] = false;
            $response['text'] = "Échec de transaction du côté de Stripe."; 
        }
    }
    // charge was not successul
    else {
        $response['ok'] = false;
        $response['text'] = "Échec de transaction du côté de Stripe."; 
    }







}
// POST doesnt contain stripeToken
else {
    $response['ok'] = false;
    $response['text'] = "Échec de transaction, aucun jeton Stripe fourni."; 
}
header('Content-Type: application/json');
echo json_encode($response);

?>