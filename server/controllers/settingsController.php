<?php 


require_once '../models/settingsModel.php';

date_default_timezone_set('US/Eastern');


class SettingsController {

    // CRUD

    // READ
    public function getSettings($id_user) {

        $settingsModel = new SettingsModel();
        $settings = $settingsModel->getSettings($id_user);
        header('Content-Type: application/json');
        return json_encode($settings);

    }


    // UPDATE
    public function saveSettings($id_user, $refresh, $color_change, $interval_1, $interval_2, $the_location) {

        $settingsModel = new SettingsModel();
        $settingsModel->saveSettings($id_user, $refresh, $color_change, $interval_1, $interval_2, $the_location);
        header('Content-Type: application/json');
        return json_encode(true);

    }


}

$settingsController = new SettingsController();

switch ($_SERVER['REQUEST_METHOD']) {
                    
    case 'POST': {

        $data = json_decode(file_get_contents('php://input'), true);

        if ($data['action'] == "getSettings") {
            $id_user = $data['id_user'];
            echo $settingsController->getSettings($id_user);
        }

        elseif ($data['action'] == "saveSettings") {
            $id_user = $data['id_user'];
            $refresh = $data['refresh'];
            $color_change = $data['color_change'];
            $interval_1 = $data['interval_1'];
            $interval_2 = $data['interval_2'];
            $the_location = $data['the_location'];
            echo $settingsController->saveSettings($id_user, $refresh, $color_change, $interval_1, $interval_2, $the_location);
        }
        
        break;

    }

}