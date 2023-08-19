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

switch ($_SERVER['REQUEST_METHOD']) {

    

    case 'POST':

        if (isset($_POST['categ_id'])) {

            $categ_id = $_POST['categ_id'];
            $food_name = $_POST['food_name'];
            echo $foodController->createFood($categ_id, $food_name);

        }

        elseif (isset($_POST['food_id'])) {

            $process_image = processAndUploadImage();
            if ($process_image[0] == false) {
                header('Content-Type: application/json');
                echo json_encode($process_image);
            }
            else {
                $food_id = $_POST['food_id'];
                $food_image = $process_image[1];
                echo $foodController->updateFoodImage($food_id, $food_image); 
            }

        }

        break;

    case 'GET':

        echo $foodController->getFoodWithCateg();
        break;

    case 'PATCH':

        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['food_name'])) {
            $food_id = $data['food_id'];
            $food_name = $data['food_name'];
            $food_avail = $data['food_avail'];
            $food_price = $data['food_price'];
            $food_descr = $data['food_descr'];
            echo $foodController->updateFood($food_id, $food_name, $food_avail, $food_price, $food_descr); 
        }
        break;
        
    case 'DELETE':
        
        $food_id = $data['food_id'];
        echo $foodController->deleteFood($food_id);
        break;

}

function processAndUploadImage() {

    try {

        $return = array();

        // check if image is present
        if (!isset($_FILES['food_image_file']['error']) || is_array($_FILES['food_image_file']['error'])) {
            throw new Exception('Invalid parameters.');
        }
        switch ($_FILES['food_image_file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new Exception('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new Exception('Exceeded filesize limit.');
            default:
                throw new Exception('Unknown error.');
        }

        // check image size
        $max_file_size = 2 * 1024 * 1024;
        if ($_FILES['food_image_file']['size'] > $max_file_size) {
            throw new Exception('Image size must be max 2MB.');
        }

        // check image file type
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $file_path = $_FILES['food_image_file']['tmp_name'];
        $uploaded_mime_type = $finfo->file($file_path);
        $allowed_mime_types = array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif'
        );
        if (!in_array($uploaded_mime_type, $allowed_mime_types)) {
            throw new Exception('Invalid file format.');
        }

        // change file name
        $original_filename = pathinfo($_FILES['food_image_file']['name'], PATHINFO_FILENAME);
        $extension = pathinfo($_FILES['food_image_file']['name'], PATHINFO_EXTENSION);
        $hash = sha1_file($file_path);
        $timestamp = time();
        $new_filename = $original_filename . '_' . $timestamp . '_' . $hash . '.' . $extension;

        $destination_folder = '../../food/';

        // confirm that folder exists
        if (!is_dir($destination_folder)) {
            throw new Exception('Destination folder does not exist.');
        }
        
        // try to save the file
        if (!move_uploaded_file($file_path, $destination_folder . $new_filename)) {
            throw new Exception('Could not not move uploaded file to server.');
        }

        array_push($return, true);
        array_push($return, $new_filename);

    } 
    catch (Exception $e) {

        array_push($return, false);
        array_push($return, $e->getMessage());

    } 
    finally {

        return $return;
        
    }

}