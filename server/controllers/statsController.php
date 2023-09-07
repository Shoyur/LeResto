<?php 


require_once '../models/statsModel.php';


class StatsController {

    // CRUD

    // READ
    public function getStats() {

        $statsModel = new StatsModel();
        $stats = $statsModel->getStats();
        header('Content-Type: application/json');
        return json_encode($stats);

    }


}

$statsController = new StatsController();

switch ($_SERVER['REQUEST_METHOD']) {
                    
    case 'GET': {

        echo $statsController->getStats();
        break;

    }

}