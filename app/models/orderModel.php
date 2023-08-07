<?php 


require_once '../config/db.php';

date_default_timezone_set('US/Eastern');

class OrderModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createOrder($customer_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_deliv, $order_notes, $cart_data) {

        try {

            $order_date = (new DateTime())->format('Y-m-d H:i:s');

            // final answer
            $return = array();

            // transaction to commit or rollback, in case there is an error, because we are making multiple queries
            $this->db->beginTransaction();

            $query1 = "INSERT INTO `order` (customer_id, order_name, order_address, order_phone, order_cc_last4, order_total, order_date, order_deliv, order_notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt1 = $this->db->prepare($query1);
            $stmt1->execute([$customer_id, $order_name, $order_address, $order_phone, $order_cc_last4, $order_total, $order_date, $order_deliv, $order_notes]);
            $order_id = $this->db->lastInsertId();

            $query2 = "INSERT INTO foodbyorder (order_id, food_id, foodbyorder_options) VALUES ";

            $multi_values = [];

            foreach ($cart_data as $food) {
                $food_id = $food[0];
                $foodbyorder_options = $food[1];
                $multi_values[] = "($order_id, $food_id, '$foodbyorder_options')";
            }

            $query2 .= implode(", ", $multi_values);

            $stmt2 = $this->db->prepare($query2);
            $stmt2->execute();

            $this->db->commit();

            array_push($return, true);
            array_push($return, $order_id);
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
    public function getOpenOrders() {

        try {

            // final answer
            $return = array();

            $query = "SELECT a.*, b.*, c.* FROM `order` AS a 
                JOIN foodbyorder AS b ON a.order_id = b.order_id 
                JOIN food AS c ON b.food_id = c.food_id 
                WHERE a.order_finished = 0 
                ORDER BY a.order_id";
            $stmt = $this->db->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            array_push($return, true);
            array_push($return, $result);

        } 
        catch (PDOException $e) {

            array_push($return, false);
            array_push($return, $e);

        }
        finally {

            return $return;

        }

    }

    public function getFinishedOrders() {

        try {

            // final answer
            $return = array();

            $query = "SELECT a.*, b.*, c.* FROM `order` AS a 
                JOIN foodbyorder AS b ON a.order_id = b.order_id 
                JOIN food AS c ON b.food_id = c.food_id 
                WHERE a.order_finished = 1 
                ORDER BY a.order_date_finished";
            $stmt = $this->db->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            array_push($return, true);
            array_push($return, $result);

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

            // if order state = 1, set finished time
            if ($order_finished == 1) {

                $order_date_finished = (new DateTime())->format('Y-m-d H:i:s');

                $query = "UPDATE `order` SET order_finished = ?, order_date_finished = ? WHERE order_id = ?";
                $stmt = $this->db->prepare($query);
                $stmt->execute([$order_finished, $order_date_finished, $order_id]);
                
            }

            else {

                $query = "UPDATE `order` SET order_finished = ? WHERE order_id = ?";
                $stmt = $this->db->prepare($query);
                $stmt->execute([$order_finished, $order_id]);

            }

            

            array_push($return, true);
            array_push($return, $order_id);

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
            
            $query = "DELETE FROM `order` WHERE order_id = ?";
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