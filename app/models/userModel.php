<?php 


require_once '../config/db.php';


class UserModel {

    private $db;

    public function __construct() {

        $conn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
        $this->db = new PDO($conn, DB_USER, DB_PASSWORD);
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }


    // CRUD

    // CREATE
    public function createUser($user_lang, $user_email, $user_pass, $user_phone, $user_address) {

        $response = array();
    
        $query = "INSERT INTO user (user_lang, user_email, user_pass, user_phone, user_address) VALUES (?, ?, ?, ?, ?)";
        
        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute([$user_lang, $user_email, $user_pass, $user_phone, $user_address]);
            $result = $this->db->lastInsertId();
            $response['ok'] = true;
            $response['result'] = $result;
        } 
        catch (PDOException $e) {
            $response['ok'] = false;
            $response['result'] = $e;
        } 
        finally {
            return $response;
        }

    }

    // READ
    public function getUser() {

        $userModel = new UserModel();
        $result = $userModel->getUser();
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // UPDATE
    public function updateUser() {

        $userModel = new UserModel();
        $result = $userModel->updateUser();
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteUser() {

        $userModel = new UserModel();
        $result = $userModel->deleteUser();
        header('Content-Type: application/json');
        return json_encode($result);

    }


}