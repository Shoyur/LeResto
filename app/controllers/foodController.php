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

            $process_image = processAndUploadImage($data);

            if (!$process_image[0]) {
                echo $process_image;
            }
            else {
                echo $foodController->updateFoodImage($food_id, $food_image); 
            }
        }
        break;
        
    case 'DELETE':
        
        $food_id = $data['food_id'];
        echo $foodController->deleteFood($food_id);
        break;

}

function processAndUploadImage($data) {

    $image_dir = '../public-clients/aliments/images/';
    $allowed_ext = array('jpg', 'jpeg', 'png', 'gif');

    try {

        $return = array();

        if (!$data) { throw new Exception('No JSON data present.'); }
        if (!$data['food_image']) { throw new Exception('No food_image data present.'); }

        $uploaded_file = $data['food_image'];

        $max_file_size = 2 * 1024 * 1024; // 2MB in bytes
        if ($uploaded_file['size'] > $max_file_size) {
            throw new Exception('File size exceeds the limit.');
        }

        

        $result = "";
        // ...

        array_push($return, true);
        array_push($return, $result);

    } 
    catch (Exception $e) {

        array_push($return, false);
        array_push($return, $e);

    } 
    finally {

        return $return;
        
    }

    
    // if (!isset($food_image['error']) || is_array($food_image['error'])) {
    //     return $result;
    // }
    if (!isset($food_image['error']) || !is_int($food_image['error'])) {
        return $result;
    }
    
    if ($food_image['error'] === UPLOAD_ERR_OK) {
        $tmpName = $food_image['tmp_name'];
        
        $fileExtension = strtolower(pathinfo($food_image['name'], PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $allowed_ext)) {
            return $result;
        }
        
        $newFilename = uniqid('food_') . '.' . $fileExtension;
        $destination = $image_dir . $newFilename;
        
        if (move_uploaded_file($tmpName, $destination)) {
            $result['success'] = true;
            $result['filename'] = $newFilename;
        }
    }
    
    return $result;
}

function processAndUploadImage2() {

    try {
        if (!isset($_FILES['food_image_file']['error']) || is_array($_FILES['food_image_file']['error'])) {
            throw new RuntimeException('Invalid parameters.');
            // throw new Error();
        }
        switch ($_FILES['food_image_file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                throw new RuntimeException('No file sent.');
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                throw new RuntimeException('Exceeded filesize limit.');
            default:
                throw new RuntimeException('Unknown error.');
        }
        if ($_FILES['food_image_file']['size'] > 1000000) {
            throw new RuntimeException('Exceeded filesize limit.');
        }
    
        // DO NOT TRUST $_FILES['food_image_file']['mime'] VALUE !!
        // Check MIME Type by yourself.
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (false === $ext = array_search(
            $finfo->file($_FILES['food_image_file']['tmp_name']),
            array(
                'jpg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
            ),
            true
        )) {
            throw new RuntimeException('Invalid file format.');
        }

        if (!move_uploaded_file(
            $_FILES['food_image_file']['tmp_name'],
            sprintf('./uploads/%s.%s',
                sha1_file($_FILES['food_image_file']['tmp_name']),
                $ext
            )
        )) {
            throw new RuntimeException('Failed to move uploaded file.');
        }
    
        echo 'File is uploaded successfully.';
    
    } 
    catch (RuntimeException $e) {
    
        echo $e->getMessage();
    
    }

}