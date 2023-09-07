<?php 


require_once '../config/db.php';

class StatsModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // READ
    public function getStats() {

        try {
            
            $return = array();

            $query1 = "SELECT * FROM `food` WHERE food_sold > 0 ORDER BY food_sold DESC";
            $stmt1 = $this->db->query($query1);
            $result1 = $stmt1->fetchAll(PDO::FETCH_ASSOC);

            // echo " json_encode(result1)= ";
            // echo json_encode($result1);
            // echo " END ";

            $query2 = "SELECT order_id, order_date, order_date_finished FROM `order` WHERE order_finished > 0 AND order_date IS NOT NULL AND order_date_finished IS NOT NULL";
            $stmt2 = $this->db->query($query2);
            $result2 = $stmt2->fetchAll(PDO::FETCH_ASSOC);

            // echo " json_encode(result2)= ";
            // echo json_encode($result2);
            // echo " END ";

            $slowest_delay = PHP_INT_MIN;
            $fastest_delay = PHP_INT_MAX;
            $total_time = 0;
            $order_count = 0;
            $average_delay = 0;

            foreach ($result2 as $order) {
                $start_time = strtotime($order['order_date']);
                $finish_time = strtotime($order['order_date_finished']);

                $order_time = floor(($finish_time - $start_time) / 60); // Calculate time difference in minutes
                $total_time += $order_time;
                $order_count++;

                if ($order_time > $slowest_delay) {
                    $slowest_delay = $order_time;
                }
                
                if ($order_time < $fastest_delay) {
                    $fastest_delay = $order_time;
                }
            }
            if ($order_count > 0) {
                $average_delay = floor($total_time / $order_count);
            }

            array_push($return, true);
            array_push($return, $result1);
            array_push($return, $slowest_delay);
            array_push($return, $fastest_delay);
            array_push($return, $average_delay);

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