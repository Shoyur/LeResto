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
    public function createCommande($id_client, $livrpick_commande, $stotal_commande, $txtotal_commande, $details_commande) {

        $requete = "INSERT INTO commande (id_client, livrpick_commande, stotal_commande, txtotal_commande, details_commande) VALUES (?, ?, ?, ?, ?)";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_client, $livrpick_commande, $stotal_commande, $txtotal_commande, $details_commande]);
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
    public function updateCommande($id_alim, $id_categ, $nom_alim, $dispo_alim, $prix_alim, $image_alim, $descr_alim, $options_alim, $nbvendu_alim) {

        $requete = "UPDATE commande SET id_categ = ?, nom_alim = ?, dispo_alim = ?, prix_alim = ?, image_alim = ?, descr_alim = ?, options_alim = ?, nbvendu_alim = ? WHERE id_alim = ?";
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