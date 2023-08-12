<?php 


require_once '../models/categModel.php';


class CategController {

    // CRUD

    // CREATE
    public function createCateg() {

        // TO DO

    }

    // READ
    public function getCategs() {

        // TO DO

    }

    // UPDATE
    public function updateCategName($new_name, $old_name) {

        $categModel = new CategModel();
        $result = $categModel->updateCategName($new_name, $old_name);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    public function updateCategSort($place1, $place2) {

        $categModel = new CategModel();
        $result = $categModel->updateCategName($place1, $place2);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteCateg() {

        // TO DO

    }


}

$categController = new CategController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        
        echo $categController->createCateg();
        break;

    case 'GET':

        echo $categController->getCategs();
        break;

    case 'PATCH':

        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['new_name'])) {

            $new_name = $data['new_name'];
            $old_name = $data['old_name'];
            echo $categController->updateCategName($new_name, $old_name); 

        }

        elseif (isset($data['place1'])) {

            $place1 = $data['place1'];
            $place2 = $data['place2'];
            echo $categController->updateCategSort($place1, $place2); 

        }

        break;
        
        
    case 'DELETE':

        echo $categController->deleteCateg();
        break;

}