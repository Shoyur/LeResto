<?php 


require_once '../models/FoodModel.php';


class FoodController {

    // CRUD

    // CREATE
    public function createFood() {

        // TO DO

    }

    // READ
    public function getFoodWithCateg() {
        
        $FoodModel = new FoodModel();
        $data = $FoodModel->getFoodWithCateg();
        header('Content-Type: application/json');
        return json_encode($data);

    }

    // UPDATE
    public function updateFood() {

        // TO DO

    }

    // DELETE
    public function deleteFood() {

        // TO DO

    }


}

$foodController = new FoodController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        echo $foodController->createFood();
        break;

    case 'GET':
        echo $foodController->getFoodWithCateg();
        break;

    case 'PATCH':
        echo $foodController->updateFood(); 
        break;
        
    case 'DELETE':
        echo $foodController->deleteFood();
        break;

}