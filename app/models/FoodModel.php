<?php 


require_once '../config/db.php';

class FoodModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createFood($categ_id, $food_name, $food_avail, $food_price, $food_image, $food_descr, $food_options, $food_sold, $food_stock) {

        $query = "INSERT INTO food (categ_id, food_name, food_avail, food_price, food_image, food_descr, food_options, food_sold, food_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_id, $food_name, $food_avail, $food_price, $food_image, $food_descr, $food_options, $food_sold, $food_stock]);
            return $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // READ
    // public function getFoodWithCateg() {

    //     try {

    //         $return = array();

    //         $query = "SELECT a.*, b.* FROM food AS a JOIN categ AS b ON a.categ_id = b.categ_id ORDER BY b.categ_sort";
    //         $stmt = $this->db->prepare($query);
    //         $stmt->execute();
    //         $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //         array_push($return, true);
    //         array_push($return, $result);

    //     } 
    //     catch (PDOException $e) {

    //         array_push($return, false);
    //         array_push($return, $e);

    //     } 
    //     finally {

    //         return $return;
            
    //     }

    // }

    public function getFoodWithCateg() {

        try {

            $return = array();

            $query = "SELECT 'category' AS type, categ_id AS id, categ_name AS name, categ_sort AS sort, NULL AS categ_id, NULL AS food_avail, NULL AS food_price, NULL AS food_image, NULL AS food_descr 
                FROM categ 
                UNION ALL 
                SELECT 'food', food_id AS id, food_name AS name, null, food.categ_id, food_avail, food_price, food_image, food_descr 
                FROM food 
                LEFT JOIN categ ON food.categ_id = categ.categ_id
                ORDER BY type, CASE WHEN type = 'category' THEN sort ELSE id END";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
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

    public function getFoodTotal($foodIds) {
        
        try {

            $return = array();

            // Prepare placeholders for the IN clause
            $placeholders = implode(',', array_fill(0, count($foodIds), '?'));

            $query = "SELECT food_id, food_price FROM food WHERE food_id IN ($placeholders)";
            $stmt = $this->db->prepare($query);
            $stmt->execute($foodIds); // Pass the array directly as parameters
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
    public function updateFood($food_id, $categ_id, $food_name, $food_avail, $food_price, $food_image, $food_descr, $food_options, $food_sold, $food_stock) {

        $query = "UPDATE food SET categ_id = ?, food_name = ?, food_avail = ?, food_price = ?, food_image = ?, food_descr = ?, food_options = ?, food_sold = ?, food_stock = ? WHERE food_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_id, $food_name, $food_avail, $food_price, $food_image, $food_descr, $food_options, $food_sold, $food_stock, $food_id]);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // DELETE
    public function deleteFood($food_id) {

        $query = "DELETE FROM food WHERE food_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$food_id]);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }


}


?>