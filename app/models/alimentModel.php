<?php 


require_once '../bdconfig/bdconfig.php';

class AlimentModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createAliment($id_categ, $nom_alim, $dispo_alim, $prix_alim, $image_alim, $descr_alim, $options_alim, $nbvendu_alim) {

        $requete = "INSERT INTO aliment (id_categ, nom_alim, dispo_alim, prix_alim, image_alim, descr_alim, options_alim, nbvendu_alim) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_categ, $nom_alim, $dispo_alim, $prix_alim, $image_alim, $descr_alim, $options_alim, $nbvendu_alim]);
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
    public function readAllAliment() {

        $requete = "SELECT * FROM aliment";
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
    public function updateAliment($id_alim, $id_categ, $nom_alim, $dispo_alim, $prix_alim, $image_alim, $descr_alim, $options_alim, $nbvendu_alim) {

        $requete = "UPDATE aliment SET id_categ = ?, nom_alim = ?, dispo_alim = ?, prix_alim = ?, image_alim = ?, descr_alim = ?, options_alim = ?, nbvendu_alim = ? WHERE id_alim = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_categ, $nom_alim, $dispo_alim, $prix_alim, $image_alim, $descr_alim, $options_alim, $nbvendu_alim, $id_alim]);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    // DELETE
    public function deleteAliment($id_aliment) {

        $requete = "DELETE FROM aliment WHERE id_aliment = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_aliment]);
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