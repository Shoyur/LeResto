<?php 


require_once '../models/settingsModel.php';

date_default_timezone_set('US/Eastern');


class SettingsController {

    // CRUD

    // READ
    public function getSettings($user_id) {

        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettings($user_id);
        header('Content-Type: application/json');
        return json_encode($settings);

    }


    // UPDATE
    public function saveSettings($user_id, $refresh, $color_change, $interval_1, $interval_2, $the_location) {

        $settingsModel = new SettingsModel();
        $settings = $settingsModel->saveSettings($user_id, $refresh, $color_change, $interval_1, $interval_2, $the_location);
        header('Content-Type: application/json');
        return json_encode($settings);

    }


}

$settingsController = new SettingsController();

switch ($_SERVER['REQUEST_METHOD']) {
                    
    case 'GET': {

        if (isset($_GET['user_id'])) {

            $user_id = $_GET['user_id'];
            echo $settingsController->getSettings($user_id);

        } 
        else {
            header('Content-Type: application/json');
            echo json_encode([false, 'Missing user_id parameter.']);
        }

        break;

    }

    case 'PATCH': {

        $data = json_decode(file_get_contents('php://input'), true);

        $user_id = $data['user_id'];
        $refresh = $data['refresh'];
        $color_change = $data['color_change'];
        $interval_1 = $data['interval_1'];
        $interval_2 = $data['interval_2'];
        $the_location = $data['the_location'];
        echo $settingsController->saveSettings($user_id, $refresh, $color_change, $interval_1, $interval_2, $the_location);

        break;
    }

}