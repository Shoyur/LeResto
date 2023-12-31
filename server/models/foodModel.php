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
    public function createFood($categ_id, $food_name) {

        try {

            $return = array();

            $query = "INSERT INTO food (categ_id, food_name) VALUES (?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_id, $food_name]);
            $result = $this->db->lastInsertId();

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

    // READ
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

    // for Stripe API
    public function getFoodTotal($food_ids) {
        
        try {

            $return = array();

            // string with separators for the foods string
            $many_foods_string = implode(',', array_fill(0, count($food_ids), '?'));

            $query = "SELECT food_id, food_price FROM food WHERE food_id IN ($many_foods_string)";
            $stmt = $this->db->prepare($query);
            $stmt->execute($food_ids);
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
    public function updateFood($food_id, $food_name, $food_avail, $food_price, $food_descr) {

        try {

            $return = array();

            $query = "UPDATE food SET food_name = ?, food_avail = ?, food_price = ?, food_descr = ? WHERE food_id = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$food_name, $food_avail, $food_price, $food_descr, $food_id]);

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

    public function updateFoodImage($food_id, $food_image) {

        try {

            $return = array();

            $query = "UPDATE food SET food_image = ? WHERE food_id = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$food_image, $food_id]);

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

    // DELETE
    public function deleteFood($food_id) {

        try {

            $return = array();

            $query = "DELETE FROM food WHERE food_id = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$food_id]);

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


}


?>