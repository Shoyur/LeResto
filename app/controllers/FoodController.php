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
    public function updateFood($food_id, $food_name, $food_avail, $food_price, $food_descr) {

        $foodModel = new FoodModel();
        $result = $foodModel->updateFood($food_id, $food_name, $food_avail, $food_price, $food_descr);
        
        header('Content-Type: application/json');
        return json_encode($result);

    }

    public function updateFoodImage($food_id, $food_image) {

        $foodModel = new FoodModel();
        $result = $foodModel->updateFoodImage($food_id, $food_image);
        
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteFood($food_id) {

        $foodModel = new FoodModel();
        $result = $foodModel->deleteFood($food_id);
        
        header('Content-Type: application/json');
        return json_encode($result);

    }


}

$foodController = new FoodController();

$data = json_decode(file_get_contents('php://input'), true);

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        
        $categ_id = $data['categ_id'];
        $food_name = $data['food_name'];
        echo $foodController->createFood($categ_id, $food_name);
        break;

    case 'GET':

        echo $foodController->getFoodWithCateg();
        break;

    case 'PATCH':

        if (isset($data['food_name'])) {
            $food_id = $data['food_id'];
            $food_name = $data['food_name'];
            $food_avail = $data['food_avail'];
            $food_price = $data['food_price'];
            $food_descr = $data['food_descr'];
            echo $foodController->updateFood($food_id, $food_name, $food_avail, $food_price, $food_descr); 
        }
        elseif (isset($data['food_image'])) {
            $food_id = $data['food_id'];
            $food_image = $data['food_image'];
            echo $foodController->updateFoodImage($food_id, $food_image); 
        }
        break;
        
    case 'DELETE':
        
        $food_id = $data['food_id'];
        echo $foodController->deleteFood($food_id);
        break;

}