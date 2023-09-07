<?php

try {

    $return = array();

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!empty($data['stripeToken'])) {

        require_once('config.php');
        require_once('init.php');

        $token = $data['stripeToken'];
        $user_id = 55; // add SESSION for user info/data
        $order_name = $data['order_name'];
        $order_address = $data['order_address'];
        $order_phone = $data['order_phone'];
        $order_cc_last4 = $data['order_cc_last4'];
        $order_deliv = $data['order_deliv'];
        $order_notes = $data['order_notes'];
        $cart_data = $data['cart_data'];


        $food_ids = array_column($cart_data, 0);
        $item_counts = array_count_values($food_ids);
        $food_ids_string = implode(',', array_unique($food_ids));

        require_once('../models/foodModel.php');
        $foodModel = new FoodModel();
        $response = $foodModel->getFoodTotal($food_ids);
        
        if ($response[0]) {
            $total = 0;
            foreach ($response[1] as $food) {
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
                $result = $orderModel->createOrder($user_id, $order_name, $order_address, $order_phone, $order_cc_last4, $total, $order_deliv, $order_notes, $cart_data);

                $total_string = number_format($amount / 100, 2);
                if ($result[0]) {
                    array_push($return, true);
                    array_push($return, $result[1]);
                    array_push($return, $total_string );
                    // $response['text'] = "Transaction no." . $response[1] . " effectuée avec succès, du montant de $" . $total_string . ".";  
                }
                // charge was successul but db error
                else {
                    array_push($return, false);
                    array_push($return, "Transaction effectuée avec succès, du montant de $" . $total_string . ", mais erreur au niveau de la base de données (" . $response[1] . ").");
                }
            }
            // charge was not successul
            else {
                array_push($return, false);
                array_push($return, "Transaction failed on Stripe side.");
            }
        }
        // charge was not successul
        else {
            array_push($return, false);
            array_push($return, "Transaction failed on Stripe side.");
        }







    }
    // POST doesnt contain stripeToken
    else {
        array_push($return, false);
        array_push($return, "Transaction failed, no Stripe token.");
    }
}
catch (Error $e) {

    array_push($return, false);
    array_push($return, $e);

}
finally {

    header('Content-Type: application/json');
    echo json_encode($return);

}

?>