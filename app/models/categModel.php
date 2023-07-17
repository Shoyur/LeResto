<?php 


require_once '../bdconfig/bdconfig.php';

class CategModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createCateg($nom_categ, $ordre_categ, $image_categ, $descr_categ) {

        $requete = "INSERT INTO categ (nom_categ, ordre_categ, image_categ, descr_categ) VALUES (?, ?, ?, ?)";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$nom_categ, $ordre_categ, $image_categ, $descr_categ]);
            return $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    // READ
    public function readAllCateg() {

        $requete = "SELECT * FROM categ";
        try {
            $stmt = $this->db->query($requete);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    // UPDATE
    public function updateCateg($id_categ, $nom_categ, $ordre_categ, $image_categ, $descr_categ) {

        $requete = "UPDATE categ SET nom_categ = ?, ordre_categ = ?, image_categ = ?, descr_categ = ? WHERE id_categ = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$nom_categ, $ordre_categ, $image_categ, $descr_categ, $id_categ]);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    // DELETE
    public function deleteCateg($id_categ) {

        $requete = "DELETE FROM categ WHERE id_categ = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_categ]);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }


}


?>