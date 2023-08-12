<?php 


require_once '../models/userModel.php';


class UserController {

    // CRUD

    // CREATE
    public function createUser($user_lang, $user_email, $user_pass, $user_phone, $user_address) {

        $userModel = new UserModel();
        $result = $userModel->createUser($user_lang, $user_email, $user_pass, $user_phone, $user_address);
        header('Content-Type: application/json');
        return json_encode($result);

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

$userController = new UserController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        $user_lang = $_POST['user_lang'];
        $user_email = $_POST['user_email'];
        $user_pass = $_POST['user_pass'];
        $user_phone = $_POST['user_phone'];
        $user_address = $_POST['user_address'];
        echo $userController->createUser($user_lang, $user_email, $user_pass, $user_phone, $user_address);
        break;

    case 'GET':
        echo $userController->getUser();
        break;

    case 'PATCH':
        echo $userController->updateUser(); 
        break;
        
    case 'DELETE':
        echo $userController->deleteUser();
        break;

}