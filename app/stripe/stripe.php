
<?php  

require_once('config.php');
require_once('init.php');

//check whether stripe token is not empty
    if(!empty($_POST['stripeToken'])){
        //get token, card and user info from the form
        $token  = $_POST['stripeToken'];
        $description = $_POST['name'];
        $total = $_POST['total'];

        // $response['ok'] = true;
        // $response['text'] = "Test. total = $total";
        // header('Content-Type: application/json');
        // echo json_encode($response);
        // exit;
        
        
        \Stripe\Stripe::setApiKey(SECRET_KEY);
        
        //charge a credit or a debit card
        $charge = \Stripe\Charge::create(array(
            'amount'   => $total,
            'currency' => 'cad',
            'source' => $token,
            'description' => $description
        ));
        
        //retrieve charge details
        $chargeJson = $charge->jsonSerialize();

        // if charge is successful
        if ($chargeJson['amount_refunded'] == 0 && 
            empty($chargeJson['failure_code']) && 
            $chargeJson['paid'] == 1 && 
            $chargeJson['captured'] == 1) {

            //order details 
            $amount = $chargeJson['amount'];
            $status = $chargeJson['status'];
            
            // include_once 'db.php';
            // $sql = "INSERT INTO orders(name,email,card_num,card_cvc,card_exp_month,card_exp_year,item_name,item_number,item_price,item_price_currency,paid_amount,paid_amount_currency,txn_id,payment_status,created,modified) VALUES('".$name."','".$email."','".$card_num."','".$card_cvc."','".$card_exp_month."','".$card_exp_year."','".$itemName."','".$itemNumber."','".$itemPrice."','".$currency."','".$amount."','".$currency."','".$balance_transaction."','".$status."','".$date."','".$date."')";
            // $insert = $db->query($sql);
            // $last_insert_id = $db->insert_id;
            
            // //if order inserted successfully
            // if ($last_insert_id && $status == 'succeeded') {
            //     $response['ok'] = true;
            //     $response['text'] = "<h2>The transaction was successful.</h2><h4>Order ID: {$last_insert_id}</h4>"; 
            if ($status == 'succeeded') {
                $response['ok'] = true;
                $response['text'] = "Transaction effectuée avec succès, du montant de $" . $amount / 100 . ".";    
            }
            else {
                $response['ok'] = false;
                $response['text'] = "Transaction has been failed"; 
            }
        }
        // charge was not successul
        else {
            $response['ok'] = false;
            $response['text'] = "Transaction has been failed"; 
        }
    }
    // POST doesnt contain stripeToken
    else {
        $response['ok'] = false;
        $response['text'] = "Form submission error......."; 
    }

    header('Content-Type: application/json');
    echo json_encode($response);

?>