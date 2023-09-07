<?php 

require_once '../models/orderModel.php';

date_default_timezone_set('US/Eastern');

class OrderController {

    // CRUD

    // CREATE
    public function createOrder($user_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_deliv, $order_notes, $cart_data) {

        $orderModel = new OrderModel();
        $result = $orderModel->createOrder($user_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_deliv, $order_notes, $cart_data);

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

    public function getFinishedOrders() {

        $orderModel = new OrderModel();
        $result = $orderModel->getFinishedOrders();

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

    public function archiveOrders() {

        $orderModel = new OrderModel();
        $result = $orderModel->archiveOrders();

        header('Content-Type: application/json');
        return json_encode($result);

    }

}


$orderController = new OrderController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET': {

        if (isset($_GET['status'])) {

            $status = $_GET['status'];

            if ($status === 'current') {
                echo $orderController->getOpenOrders();
            } 
            elseif ($status === 'finished') {
                echo $orderController->getFinishedOrders();
            } 
            else {
                header('Content-Type: application/json');
                echo json_encode([false, 'Invalid status parameter.']);
            }
        } 
        else {
            header('Content-Type: application/json');
            echo json_encode([false, 'Missing status parameter.']);
        }

        break;

    }

    case 'PATCH': {

        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['archive'])) {

            echo $orderController->archiveOrders(); 

        }

        else {

            $order_id = $data['order_id'];
            $order_finished = $data['order_finished'];
            echo $orderController->updateOrder($order_id, $order_finished); 

        }

        break;
        
    }

}