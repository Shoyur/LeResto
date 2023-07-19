<?php 


require_once '../models/alimentModel.php';


class AlimentController {

    public function requete() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    
            switch($_POST['action']) {
                case "createAliment":
                    echo $this->createAliment();
                    break;
                case "readAlimentsByCateg":
                    echo $this->readAlimentsByCateg($_POST['id']);
                    break;
                case "updateAliment":
                    echo $this->updateAliment(); 
                    break;
                case "deleteAliment":
                    echo $this->deleteAliment();
                    break;
            }
        
        }

    }


    // CRUD

    // CREATE
    public function createAliment() {

        // À FAIRE...

    }

    // READ
    public function readAlimentsByCateg($id_categ) {
        
        $alimentModel = new AlimentModel();
        $aliments = $alimentModel->readAlimentsByCateg($id_categ);
        header('Content-Type: application/json');
        return json_encode($aliments);

    }

    // UPDATE
    public function updateAliment() {

        // À FAIRE...

    }

    // DELETE
    public function deleteAliment() {

        // À FAIRE...

    }


}

$alimentController = new AlimentController();
$alimentController->requete();