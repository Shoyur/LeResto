<?php 


require_once '../models/categModel.php';


class CategController {

    // CRUD

    // CREATE
    public function createCateg($categ_name, $categ_sort) {

        $categModel = new CategModel();
        $result = $categModel->createCateg($categ_name, $categ_sort);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    // READ
    public function getCategs() {

    }

    // UPDATE
    public function updateCategName($new_name, $old_name) {

        $categModel = new CategModel();
        $result = $categModel->updateCategName($new_name, $old_name);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    public function updateCategSort($categ_id_1, $categ_id_2) {

        $categModel = new CategModel();
        $result = $categModel->updateCategSort($categ_id_1, $categ_id_2);

        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteCateg($categ_id) {

        $categModel = new CategModel();
        $result = $categModel->deleteCateg($categ_id);

        header('Content-Type: application/json');
        return json_encode($result);

    }


}

$categController = new CategController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        
        $data = json_decode(file_get_contents('php://input'), true);

        $categ_name = $data['categ_name'];
        $categ_sort = $data['categ_sort'];
        echo $categController->createCateg($categ_name, $categ_sort);
        break;

    case 'GET':

        break;

    case 'PATCH':

        $data = json_decode(file_get_contents('php://input'), true);

        // update name
        if (isset($data['new_name'])) {

            $new_name = $data['new_name'];
            $old_name = $data['old_name'];
            echo $categController->updateCategName($new_name, $old_name); 

        }
        // update (switch) sort values
        elseif (isset($data['categ_id_1'])) {

            $categ_id_1 = $data['categ_id_1'];
            $categ_id_2 = $data['categ_id_2'];
            echo $categController->updateCategSort($categ_id_1, $categ_id_2); 

        }
        break;
        
        
    case 'DELETE':

        $data = json_decode(file_get_contents('php://input'), true);

        $categ_id = $data['categ_id'];
        echo $categController->deleteCateg($categ_id);
        break;

}