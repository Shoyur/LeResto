<?php 


require_once '../dbconfig/dbconfig.php';

class OrderModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createOrder($customer_id, $order_date, $order_deliv, $order_notes) {

        $query = "INSERT INTO order ($customer_id, $order_date, $order_deliv, $order_notes) VALUES (?, ?, ?, ?)";
        try {
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([$customer_id, $order_date, $order_deliv, $order_notes]);
            $result = $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            $result = $e;
        }
        finally {
            return array('result' => $result);
        }

    }

    // READ
    public function getOrders() {

        $query = "SELECT * FROM order";
        try {
            $stmt = $this->db->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch (PDOException $e) {
            $result = $e;
        }
        finally {
            return array('result' => $result);
        }

    }

    // UPDATE
    public function updateOrder($order_id, $order_finished) {

        $query = "UPDATE order SET order_finished = ? WHERE order_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$order_finished, $order_id]);
            $result = $stmt->rowCount();
        } 
        catch (PDOException $e) {
            $result = $e;
        }
        finally {
            return array('result' => $result);
        }

    }

    // DELETE
    public function deleteOrder($order_id) {

        $query = "DELETE FROM order WHERE order_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$order_id]);
            $result = $stmt->rowCount();
        } 
        catch (PDOException $e) {
            $result = $e;
        }
        finally {
            return array('result' => $result);
        }

    }

    public function deleteFinishedOrders() {

        $query = "DELETE FROM order WHERE order_finished = 1";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $result = $stmt->rowCount();
        } 
        catch (PDOException $e) {
            $result = $e;
        }
        finally {
            return array('result' => $result);
        }
    }


}


?>