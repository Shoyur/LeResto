<?php 


require_once '../models/commandeModel.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    switch($_POST['action']) {
        case "createCommande":
            return $this->createCommande();
            break;
        case "readAllCommandePresentes":
            return $this->readAllCommandePresentes();
            break;
        case "readAllCommandeTerminees":
            return $this->readAllCommandeTerminees(); 
            break;
        case "updateCommande":
            return $this->updateCommande(); 
            break;
        case "deleteCommande":
            return $this->deleteCommande();
            break;
        case "deleteAllCommande":
            return $this->deleteAllCommande();
            break;
    }

}


class CommandeController {

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

        $commandeModel = new CommandeModel();
        $commandes = $commandeModel->readAllCommandePresentes();
        header('Content-Type: application/json');
        echo json_encode($commandes);

    }

    public function readAllCommandeTerminees() {

        $commandeModel = new CommandeModel();
        $commandes = $commandeModel->readAllCommandeTerminees();
        header('Content-Type: application/json');
        echo json_encode($commandes);
        
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