<?php 


require_once '../models/FoodModel.php';


class FoodController {

    // CRUD

    // CREATE
    public function createFood($categ_id, $food_name) {

        $foodModel = new FoodModel();
        $result = $foodModel->createFood($categ_id, $food_name);
        
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // READ
    public function getFoodWithCateg() {
        
        $foodModel = new FoodModel();
        $result = $foodModel->getFoodWithCateg();
        
        header('Content-Type: application/json');
        return json_encode($result);

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

        $data = json_decode(file_get_contents('php://input'), true);

        $categ_id = $data['categ_id'];
        $food_name = $data['food_name'];
        echo $foodController->createFood($categ_id, $food_name);
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