<?php 


require_once '../config/db.php';

class CategModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createCateg($categ_name, $categ_sort) {

        try {

            $return = array();

            $query = "INSERT INTO categ (categ_name, categ_sort) VALUES (?, ?)";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_name, $categ_sort]);
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

    // UPDATE
    public function updateCategName($new_name, $old_name) {

        try {

            $return = array();

            $query = "UPDATE categ SET categ_name = ? WHERE categ_name = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$new_name, $old_name]);

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

    public function updateCategSort($categ_id_1, $categ_id_2) {

        try {
            
            $return = array();

            $query = "UPDATE categ
            SET categ_sort = CASE
                WHEN categ_id = ? THEN (SELECT categ_sort FROM categ WHERE categ_id = ?)
                WHEN categ_id = ? THEN (SELECT categ_sort FROM categ WHERE categ_id = ?)
                ELSE categ_sort
            END
            WHERE categ_id IN (?, ?)";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$categ_id_1, $categ_id_2, $categ_id_2, $categ_id_1, $categ_id_1, $categ_id_2]);

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
    public function deleteCateg($categ_id) {

        try {
                        
            $return = array();

            $query = "DELETE FROM categ WHERE categ_id = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$categ_id]);
            
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