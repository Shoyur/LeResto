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
    public function getFoodWithCateg() {

        $query = "SELECT a.*, b.* FROM food AS a JOIN categ AS b ON a.categ_id = b.categ_id ORDER BY b.categ_sort";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
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