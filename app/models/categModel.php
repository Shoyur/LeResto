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
    public function createCateg($categ_name, $categ_sort, $categ_image, $categ_descr) {

        $query = "INSERT INTO categ (categ_name, categ_sort, categ_image, categ_descr) VALUES (?, ?, ?, ?)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_name, $categ_sort, $categ_image, $categ_descr]);
            return $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // UPDATE
    public function updateCateg($categ_id, $categ_name, $categ_sort, $categ_image, $categ_descr) {

        $query = "UPDATE categ SET categ_name = ?, categ_sort = ?, categ_image = ?, categ_descr = ? WHERE categ_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_name, $categ_sort, $categ_image, $categ_descr, $categ_id]);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // DELETE
    public function deleteCateg($categ_id) {

        $query = "DELETE FROM categ WHERE categ_id = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$categ_id]);
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