<?php 


require_once '../models/orderModel.php';

date_default_timezone_set('US/Eastern');


class OrderController {

    // CRUD

    // CREATE
    public function createOrder($customer_id, $order_deliv, $order_notes) {

        $order_date = new DateTime();
        $order_date = $order_date->format('Y-m-d H:i:s');

        $orderModel = new OrderModel();
        $result = $orderModel->createOrder($customer_id, $order_date, $order_deliv, $order_notes);
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // READ
    public function getOrders() {

        $orderModel = new OrderModel();
        $result = $orderModel->getOrders();

        foreach ($result as &$order) {
            $order_date = strtotime($order['order_date']);
            $delay_sec = time() - $order_date;
            $order['delay'] = $delay_sec;
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

    case 'POST': {

        $customer_id = $_POST['customer_id'];
        $order_deliv = $_POST['order_deliv'];
        $order_notes = $_POST['order_notes'];

        echo $orderController->createOrder($customer_id, $order_deliv, $order_notes);
        break;

    }

    case 'GET': {

        echo $orderController->getOrders();
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