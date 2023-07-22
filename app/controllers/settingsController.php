<?php 


require_once '../models/settingsModel.php';

date_default_timezone_set('US/Eastern');


class SettingsController {

    public function requete() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    
            switch($_POST['action']) {

                case "getSettings":
                    $id_user = $_POST['id_user'];
                    echo $this->getSettings($id_user);
                    break;

                case "saveSettings":
                    $id_user = $_POST['id_user'];
                    $refresh = $_POST['refresh'];
                    $color_change = $_POST['color_change'];
                    $interval_1 = $_POST['interval_1'];
                    $interval_2 = $_POST['interval_2'];
                    $the_location = $_POST['the_location'];
                    echo $this->saveSettings($id_user, $refresh, $color_change, $interval_1, $interval_2, $the_location);
                    break;

            }
        
        }

    }


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
$settingsController->requete();