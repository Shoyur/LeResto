<?php 


require_once '../dbconfig/dbconfig.php';

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

        $query = "INSERT INTO commande (quand_commande, id_client, livrpick_commande, stotal_commande, txtotal_commande, details_commande) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            
            $stmt = $this->db->prepare($query);
            $stmt->execute([$quand_commande, $id_client, $livrpick_commande, $stotal_commande, $txtotal_commande, $details_commande]);
            return $this->db->lastInsertId();
        } 
        catch (PDOException $e) {
            // return ['Error : ' . $e];
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // READ
    public function getOpenOrders() {

        $query = "SELECT * FROM commande WHERE terminee_commande = 0";
        try {
            $stmt = $this->db->query($query);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    public function getFinishedOrders() {

        $query = "SELECT * FROM commande WHERE terminee_commande = 1";
        try {
            $stmt = $this->db->query($query);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    // UPDATE
    public function updateOrderFinish($id_commande, $terminee_commande) {

        $query = "UPDATE commande SET terminee_commande = ? WHERE id_commande = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$terminee_commande, $id_commande]);
            $success = $stmt->rowCount() > 0;
        } 
        catch (PDOException $e) {
            $success = false;
        }
        finally {
            return array('success' => $success);
        }

    }

    // DELETE
    public function deleteCommande($id_commande) {

        $query = "DELETE FROM commande WHERE id_commande = ?";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$id_commande]);
        } 
        catch (PDOException $e) {
            // TO DO
        }
        finally {
            // TO DO
        }

    }

    public function deleteAllCommande() {

        $query = "DELETE FROM commande WHERE terminee_commande = 1";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            $combien = $stmt->rowCount();
            return $combien;
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