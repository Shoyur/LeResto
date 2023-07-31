<?php 


require_once '../config/db.php';

class OrderModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createOrder($customer_id, $order_date, $order_deliv, $order_notes, $food_array) {

        try {

            // final answer
            $return = array();

            // transaction to commit or rollback, in case there is an error, because we are making multiple queries
            $this->db->beginTransaction();

            $query1 = "INSERT INTO order (customer_id, order_date, order_deliv, order_notes) VALUES (?, ?, ?, ?)";
            $stmt1 = $this->db->prepare($query1);
            $stmt1->execute([$customer_id, $order_date, $order_deliv, $order_notes]);
            $db_result = $this->db->lastInsertId();

            $query2 = "INSERT INTO foodbyorder (order_id, food_id, fbo_options) VALUES (?, ?, ?)";
            $stmt2 = $this->db->prepare($query2);
            foreach ($food_array as $food) {
                $order_id = $food[0];
                $food_id = $food[1];
                $fbo_options = $food[2];
                $stmt2->execute([$order_id, $food_id, $fbo_options]);
            }

            $this->db->commit();
            array_push($return, true);
            array_push($return, $db_result);
        } 
        catch (PDOException $e) {
            $this->db->rollBack();
            array_push($return, false);
            array_push($return, $e);
        }
        finally {
            return $return;
        }

    }

    // READ
    public function getOrders() {

        try {

            // final answer
            $return = array();

            $query = "SELECT * FROM order";
            $stmt = $this->db->query($query);
            $db_result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            array_push($return, true);
            array_push($return, $db_result);
        } 
        catch (PDOException $e) {
            array_push($return, false);
            array_push($return, $e);
        }
        finally {
            return $return;
        }

    }

    // UPDATE
    public function updateOrder($order_id, $order_finished) {

        
        try {

            // final answer
            $return = array();

            $query = "UPDATE order SET order_finished = ? WHERE order_id = ?";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$order_finished, $order_id]);
            $db_result = $stmt->rowCount();

            array_push($return, true);
            array_push($return, $db_result);
        } 
        catch (PDOException $e) {
            array_push($return, false);
            array_push($return, $e);
        }
        finally {
            return $return;
        }

    }

    // DELETE
    public function deleteOrder($order_id) {

        try {

            // final answer
            $return = array();
            
            $query = "DELETE FROM order WHERE order_id = ?";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$order_id]);
            $db_result = $stmt->rowCount();

            array_push($return, true);
            array_push($return, $db_result);
        } 
        catch (PDOException $e) {
            array_push($return, false);
            array_push($return, $e);
        }
        finally {
            return $return;
        }

    }

    public function deleteFinishedOrders() {

        try {

            // final answer
            $return = array();

            $query = "DELETE FROM order WHERE order_finished = 1";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $db_result = $stmt->rowCount();

            array_push($return, true);
            array_push($return, $db_result);
        } 
        catch (PDOException $e) {
            array_push($return, false);
            array_push($return, $e);
        }
        finally {
            return $return;
        }
    }


}


?>