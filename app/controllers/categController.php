<?php 


require_once '../models/categModel.php';


class CategController {

    public function requete() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    
            switch($_POST['action']) {
                case "createCateg":
                    echo $this->createCateg();
                    break;
                case "readAllCateg":
                    echo $this->readAllCateg();
                    break;
                case "updateCateg":
                    echo $this->updateCateg(); 
                    break;
                case "deleteCateg":
                    echo $this->deleteCateg();
                    break;
            }
        
        }

    }


    // CRUD

    // CREATE
    public function createCateg() {

        // À FAIRE...

    }

    // READ
    public function readAllCateg() {
        
        $categModel = new CategModel();
        $categs = $categModel->readAllCateg();
        header('Content-Type: application/json');
        return json_encode($categs);

    }

    // UPDATE
    public function updateCateg() {

        // À FAIRE...

    }

    // DELETE
    public function deleteCateg() {

        // À FAIRE...

    }

    public function deleteAllCateg() {

        // À FAIRE...

    }


}

$categController = new CategController();
$categController->requete();