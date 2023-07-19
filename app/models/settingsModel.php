<?php 


require_once '../bdconfig/bdconfig.php';

class SettingsModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // READ
    public function getSettings($id_user) {

        $requete = "SELECT * FROM settings WHERE id_user = ? LIMIT 1";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$id_user]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } 
        catch (PDOException $e) {
            // À FAIRE
        }
        finally {
            // À FAIRE
        }

    }


    // UPDATE
    public function saveSettings($id_user, $refresh, $color_change, $interval_1, $interval_2, $location) {

        $requete = "UPDATE settings SET refresh = ?, color_change = ?, interval_1 = ?, interval_2 = ?, location = ? WHERE id_user = ?";
        try {
            $stmt = $this->db->prepare($requete);
            $stmt->execute([$refresh, $color_change, $interval_1, $interval_2, $location, $id_user]);
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