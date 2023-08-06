<?php 


require_once '../models/orderModel.php';

date_default_timezone_set('US/Eastern');


class OrderController {

    // CRUD

    // CREATE
    public function createOrder($customer_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_deliv, $order_notes, $cart_data) {

        $orderModel = new OrderModel();
        $result = $orderModel->createOrder($customer_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_deliv, $order_notes, $cart_data);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    // READ
    public function getOpenOrders() {

        $orderModel = new OrderModel();
        $result = $orderModel->getOpenOrders();

        if ($result[0]) {
            foreach ($result[1] as &$order) {
                $order_date = strtotime($order['order_date']);
                $delay_sec = time() - $order_date;
                $order['delay'] = $delay_sec;
            }
        }
        
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // UPDATE
    public function updateOrder($order_id, $order_finished) {

        $orderModel = new OrderModel();
        $result = $orderModel->updateOrder($order_id, $order_finished);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteOrder($order_id) {

        $orderModel = new OrderModel();
        $result = $orderModel->deleteOrder($order_id);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    public function deleteFinishedOrders() {
        
        $orderModel = new OrderModel();
        $result = $orderModel->deleteFinishedOrders();

        header('Content-Type: application/json');
        return json_encode($result);

    }


}


$orderController = new OrderController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET': {

        echo $orderController->getOpenOrders();
        break;

    }

    case 'PATCH': {

        $order_id = $_POST['order_id'];
        $order_finished = $_POST['order_finished'];

        echo $orderController->updateOrder($order_id, $order_finished); 
        break;
        
    }

    case 'DELETE': {

        // switch ($_POST['finished']) {

        //     case'' : {
        //         echo $orderController->deleteOrder();
        //         break;
        //     }

        //     case '': {
        //         echo $orderController->deleteOrder();
        //         break;
        //     }

        //     default: {
        //         echo array('result' => 'Wrong \'finished\' value.');
        //     }
            
        // }
    }
}