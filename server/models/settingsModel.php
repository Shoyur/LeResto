<?php 


require_once '../config/db.php';

class SettingsModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // READ
    public function getSettings($user_id) {

        try {
            
            $return = array();

            $query = "SELECT * FROM settings WHERE id_user = ? LIMIT 1";
            $stmt = $this->db->prepare($query);
            $stmt->execute([$user_id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

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
    public function saveSettings($user_id, $refresh, $color_change, $interval_1, $interval_2, $the_location) {

        try {

            $return = array();

            $query = "UPDATE settings SET refresh = ?, color_change = ?, interval_1 = ?, interval_2 = ?, the_location = ? WHERE id_user = ?";
            $stmt = $this->db->prepare($query);
            $result = $stmt->execute([$refresh, $color_change, $interval_1, $interval_2, $the_location, $user_id]);
            
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