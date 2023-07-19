<?php 


require_once '../bdconfig/bdconfig.php';

class CommandeModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createCommande($quand_commande, $id_client, $livrpick_commande, $stotal_commande, $txtotal_commande, $details_commande) {

        $requete = "INSERT INTO commande (quand_commande, id_client, livrpick_commande, stotal_commande, txtotal_commande, details_commande) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$quand_commande, $id_client, $livrpick_commande, $stotal_commande, $txtotal_commande, $details_commande]);
            return $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            echo 'erreur : ' . $e;
        }
        finally {
            // À FAIRE
        }

    }

    // READ
    public function readAllCommandePresentes() {

        $requete = "SELECT * FROM commande WHERE terminee_commande = 0";
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

    public function readAllCommandeTerminees() {

        $requete = "SELECT * FROM commande WHERE terminee_commande = 1";
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
    public function updateCommandeTerminee($id_commande, $terminee_commande) {

        $requete = "UPDATE commande SET terminee_commande = ? WHERE id_commande = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$terminee_commande, $id_commande]);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    // DELETE
    public function deleteCommande($id_commande) {

        $requete = "DELETE FROM commande WHERE id_commande = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_commande]);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }

    public function deleteAllCommande() {

        $requete = "DELETE FROM commande WHERE terminee_commande = 1";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute();
            $combien = $stmt->rowCount();
            return $combien;
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